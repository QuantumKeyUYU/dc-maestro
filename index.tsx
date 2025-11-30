// index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { UiSettingsProvider } from './UiSettingsContext';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element with id "root" not found');
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <UiSettingsProvider>
      <App />
    </UiSettingsProvider>
  </React.StrictMode>,
);
