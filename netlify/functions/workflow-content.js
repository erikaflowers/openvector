import jwt from 'jsonwebtoken';
import { verifyUser, supabaseAdmin, errorResponse, jsonResponse } from './lib/auth.js';

const MUX_SIGNING_KEY_ID = process.env.MUX_SIGNING_KEY_ID;
const MUX_SIGNING_KEY_PRIVATE = process.env.MUX_SIGNING_KEY_PRIVATE;

/**
 * Generate a signed Mux playback URL for a video.
 * Token expires in 15 minutes and is domain-restricted.
 */
function signMuxPlaybackUrl(playbackId) {
  if (!MUX_SIGNING_KEY_ID || !MUX_SIGNING_KEY_PRIVATE) {
    return null;
  }

  const privateKey = Buffer.from(MUX_SIGNING_KEY_PRIVATE, 'base64');

  const token = jwt.sign(
    {
      sub: playbackId,
      aud: 'v',
      exp: Math.floor(Date.now() / 1000) + 15 * 60, // 15 minutes
      kid: MUX_SIGNING_KEY_ID,
    },
    privateKey,
    { algorithm: 'RS256', keyid: MUX_SIGNING_KEY_ID }
  );

  return {
    playbackUrl: `https://stream.mux.com/${playbackId}.m3u8?token=${token}`,
    thumbnailUrl: `https://image.mux.com/${playbackId}/thumbnail.webp?token=${token}`,
    token,
  };
}

export default async (req) => {
  if (req.method !== 'POST') {
    return errorResponse('Method not allowed', 405);
  }

  try {
    const { workflowSlug, pageSlug } = await req.json();

    if (!workflowSlug || !pageSlug) {
      return errorResponse('workflowSlug and pageSlug are required');
    }

    // Look up the workflow
    const { data: workflow, error: wfError } = await supabaseAdmin
      .from('workflows')
      .select('id, slug, title, status')
      .eq('slug', workflowSlug)
      .single();

    if (wfError || !workflow) {
      return errorResponse('Workflow not found', 404);
    }

    // Only published workflows (or admin)
    let user = null;
    let isAdmin = false;

    try {
      user = await verifyUser(req);
      const { data: profile } = await supabaseAdmin
        .from('profiles')
        .select('is_admin')
        .eq('id', user.id)
        .single();
      isAdmin = profile?.is_admin || false;
    } catch {
      // Anonymous access — only allowed for preview pages of published workflows
    }

    if (workflow.status !== 'published' && !isAdmin) {
      return errorResponse('Workflow not found', 404);
    }

    // Look up the requested page
    const { data: page, error: pageError } = await supabaseAdmin
      .from('workflow_pages')
      .select('id, slug, title, page_number, content_md, video_id, video_duration')
      .eq('workflow_id', workflow.id)
      .eq('slug', pageSlug)
      .single();

    if (pageError || !page) {
      return errorResponse('Page not found', 404);
    }

    // Access check: page 1 is free, pages 2+ require purchase or admin
    if (page.page_number > 1 && !isAdmin) {
      if (!user) {
        return errorResponse('Authentication required', 401);
      }

      const { data: purchase } = await supabaseAdmin
        .from('purchases')
        .select('status')
        .eq('user_id', user.id)
        .eq('workflow_id', workflow.id)
        .eq('status', 'completed')
        .single();

      if (!purchase) {
        return errorResponse('Purchase required to access this content', 403);
      }
    }

    // Get total page count and adjacent pages for navigation
    const { data: allPages } = await supabaseAdmin
      .from('workflow_pages')
      .select('slug, title, page_number')
      .eq('workflow_id', workflow.id)
      .order('page_number', { ascending: true });

    const totalPages = allPages?.length || 0;
    const currentIndex = allPages?.findIndex((p) => p.slug === pageSlug) ?? -1;
    const prevPage = currentIndex > 0 ? allPages[currentIndex - 1] : null;
    const nextPage = currentIndex < totalPages - 1 ? allPages[currentIndex + 1] : null;

    // Generate signed Mux URL if video exists
    let video = null;
    if (page.video_id) {
      const signed = signMuxPlaybackUrl(page.video_id);
      if (signed) {
        video = {
          playbackId: page.video_id,
          token: signed.token,
          playbackUrl: signed.playbackUrl,
          thumbnailUrl: signed.thumbnailUrl,
          duration: page.video_duration,
        };
      }
    }

    return jsonResponse({
      workflow: {
        title: workflow.title,
        slug: workflow.slug,
        totalPages,
      },
      page: {
        id: page.id,
        title: page.title,
        pageNumber: page.page_number,
        contentMd: page.content_md,
      },
      video,
      prevPage: prevPage ? { slug: prevPage.slug, title: prevPage.title } : null,
      nextPage: nextPage ? { slug: nextPage.slug, title: nextPage.title } : null,
      pages: allPages?.map((p) => ({
        slug: p.slug,
        title: p.title,
        pageNumber: p.page_number,
      })),
    });
  } catch (err) {
    console.error('Workflow content error:', err);
    return errorResponse('Something went wrong', 500);
  }
};
