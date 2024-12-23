import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import React from 'react';

import '@shopify/polaris/build/esm/styles.css'; // Importa os estilos do Polaris
import './custom.css';
import { AppProvider } from '@shopify/polaris';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
      asdf asdf
      <App />
    </AppProvider>
  </StrictMode>
)
