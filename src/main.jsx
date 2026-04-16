import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import { ProgressProvider } from './contexts/ProgressContext';
import { WorkflowProvider } from './contexts/WorkflowContext';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ProgressProvider>
          <WorkflowProvider>
            <App />
          </WorkflowProvider>
        </ProgressProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
