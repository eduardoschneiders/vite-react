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
let products = [
  { name: 'T-shirt', price: 20 },
  { name: 'Jeans', price: 40 },
  { name: 'Jacket', price: 60 },
  { name: 'Sneakers', price: 50 },
  { name: 'Hat', price: 15 },
  { name: 'Socks', price: 5 },
  { name: 'Scarf', price: 10 },
]

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/new" element={<NewComponent foo="FOOOO" products={products} />} />
        </Routes>
      </Router>
    </AppProvider>
  </StrictMode>
)
