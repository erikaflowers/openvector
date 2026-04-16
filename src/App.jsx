import { Routes, Route } from 'react-router-dom';
import LearnLayout from './layouts/LearnLayout';
import OpenVectorPage from './pages/OpenVectorPage';
import LearnHubPage from './pages/learn/LearnHubPage';
import LearnIndexPage from './pages/learn/LearnIndexPage';
import LevelPage from './pages/learn/LevelPage';
import LessonPage from './pages/learn/LessonPage';
import LearnResourcesPage from './pages/learn/LearnResourcesPage';
import LearnChatPage from './pages/learn/LearnChatPage';
import LearnContributePage from './pages/learn/LearnContributePage';
import LearnAboutPage from './pages/learn/LearnAboutPage';
import LearnFAQPage from './pages/learn/LearnFAQPage';
import LearnChangelogPage from './pages/learn/LearnChangelogPage';
import LearnProgressPage from './pages/learn/LearnProgressPage';
import LearnGlossaryPage from './pages/learn/LearnGlossaryPage';
import LearnEnterprisePage from './pages/learn/LearnEnterprisePage';
import ApproachIndexPage from './pages/learn/ApproachIndexPage';
import GuidePage from './pages/learn/GuidePage';
import LearnWorkflowsPage from './pages/learn/LearnWorkflowsPage';
import WorkflowDetailPage from './pages/learn/WorkflowDetailPage';
import WorkflowPageView from './pages/learn/WorkflowPageView';
import AdminWorkflowsPage from './pages/learn/AdminWorkflowsPage';
import AdminWorkflowEditPage from './pages/learn/AdminWorkflowEditPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<OpenVectorPage />} />
      <Route path="/learn" element={<LearnLayout />}>
        <Route index element={<LearnHubPage />} />
        <Route path="curriculum" element={<LearnIndexPage />} />
        <Route path="curriculum/:levelSlug" element={<LevelPage />} />
        <Route path="curriculum/:levelSlug/:lessonSlug" element={<LessonPage />} />
        <Route path="approach" element={<ApproachIndexPage />} />
        <Route path="approach/:guideSlug" element={<GuidePage />} />
        <Route path="workflows" element={<LearnWorkflowsPage />} />
        <Route path="workflows/:workflowSlug" element={<WorkflowDetailPage />} />
        <Route path="workflows/:workflowSlug/:pageSlug" element={<WorkflowPageView />} />
        <Route path="admin/workflows" element={<AdminWorkflowsPage />} />
        <Route path="admin/workflows/:workflowSlug" element={<AdminWorkflowEditPage />} />
        <Route path="resources" element={<LearnResourcesPage />} />
        <Route path="chat" element={<LearnChatPage />} />
        <Route path="contribute" element={<LearnContributePage />} />
        <Route path="about" element={<LearnAboutPage />} />
        <Route path="faq" element={<LearnFAQPage />} />
        <Route path="changelog" element={<LearnChangelogPage />} />
        <Route path="progress" element={<LearnProgressPage />} />
        <Route path="glossary" element={<LearnGlossaryPage />} />
        <Route path="enterprise" element={<LearnEnterprisePage />} />
      </Route>
    </Routes>
  );
}

export default App;
