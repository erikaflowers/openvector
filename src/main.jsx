import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import { ProgressProvider } from './contexts/ProgressContext';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ProgressProvider>
          <App />
        </ProgressProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
