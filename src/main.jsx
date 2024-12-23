import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import React from 'react';

import '@shopify/polaris/build/esm/styles.css'; // Importa os estilos do Polaris
import './custom.css';
import { AppProvider } from '@shopify/polaris';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NewComponent from './NewComponent'; // Importe seu novo componente

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/new" element={<NewComponent />} />
        </Routes>
      </Router>
    </AppProvider>
  </StrictMode>
)
