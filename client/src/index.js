import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { ManagefluentProvider } from './components/ManagefluentContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ManagefluentProvider><App /></ManagefluentProvider>
  </React.StrictMode>
);
