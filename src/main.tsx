import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from '../src/App';
import React from 'react';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Root element with ID 'root' not found.");
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);