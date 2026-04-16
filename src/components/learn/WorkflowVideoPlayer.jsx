import MuxPlayer from '@mux/mux-player-react';

function WorkflowVideoPlayer({ playbackId, token, thumbnailToken, title }) {
  if (!playbackId || !token) return null;

  return (
    <div
      className="ovl-wf-video"
      onContextMenu={(e) => e.preventDefault()}
    >
      <MuxPlayer
        playbackId={playbackId}
        tokens={{
          playback: token,
          thumbnail: thumbnailToken || token,
        }}
        metadata={{ video_title: title || 'Workflow Video' }}
        streamType="on-demand"
        primaryColor="#0055ff"
        secondaryColor="#0a0a0a"
        style={{ width: '100%', aspectRatio: '16/9' }}
      />
    </div>
  );
}

export default WorkflowVideoPlayer;
