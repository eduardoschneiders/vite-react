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
import Products from './Products'; // Importe seu novo componente
import ShowProduct from './ShowProduct'; // Importe seu novo componente
import ProductPreorderPage from './ProductPreorderPage'; // Importe seu novo componente


// let products = [
//   { name: 'T-shirt', price: 20 },
//   { name: 'Jeans', price: 40 },
//   { name: 'Jacket', price: 60 },
//   { name: 'Sneakers', price: 50 },
//   { name: 'Hat', price: 15 },
//   { name: 'Socks', price: 5 },
//   { name: 'Scarf', price: 10 },
// ]

let products = [
  // { id: 1, imageUrl: 'https://cataas.com/cat?width=101', url: '/', name: "Laptop Pro 15", status: "enabled" },
  // { id: 2, imageUrl: 'https://cataas.com/cat?width=102', url: '/', name: "Wireless Mouse", status: "enabled" },
  // { id: 3, imageUrl: 'https://cataas.com/cat?width=103', url: '/', name: "Mechanical Keyboard", status: "disabled" },
  // { id: 4, imageUrl: 'https://cataas.com/cat?width=104', url: '/', name: "HD Monitor 27", status: "enabled" },
  // { id: 5, imageUrl: 'https://cataas.com/cat?width=105', url: '/', name: "USB-C Docking Station", status: "disabled" },
  // { id: 6, imageUrl: 'https://cataas.com/cat?width=106', url: '/', name: "Noise Cancelling Headphones", status: "enabled" },
  // { id: 7, imageUrl: 'https://cataas.com/cat?width=107', url: '/', name: "Ergonomic Chair", status: "enabled" },
  // { id: 8, imageUrl: 'https://cataas.com/cat?width=108', url: '/', name: "Smartphone Case", status: "disabled" },
  // { id: 9, imageUrl: 'https://cataas.com/cat?width=109', url: '/', name: "Portable SSD 1TB", status: "enabled" },
  // { id: 10, imageUrl: 'https://cataas.com/cat?width=110', url: '/', name: "Webcam Full HD", status: "enabled" }
]
let tags = [
  { id: 1, name: "Electronics", status: "disabled", url: '/', },
  { id: 2, name: "Furniture", status: "disabled", url: '/', },
  { id: 3, name: "Accessories", status: "enabled", url: '/', },
  { id: 4, name: "Gaming", status: "disabled", url: '/', },
  { id: 5, name: "Office Supplies", status: "enabled", url: '/', },
  { id: 6, name: "Storage", status: "enabled", url: '/', },
  { id: 7, name: "Audio", status: "enabled", url: '/', },
  { id: 8, name: "Video", status: "enabled", url: '/', },
  { id: 9, name: "Mobile", status: "disabled", url: '/', },
  { id: 10, name: "Peripherals", status: "enabled", url: '/', }
]
let productsToAdd = [
  {
    id: 1, imageUrl: 'https://cataas.com/cat?width=101', url: '/', name: "Laptop Pro 15", numberAvailable: 10, price: '$12.95',
    variants: [
      { id: 321, name: "Laptop Pro 15 variant 1", numberAvailable: 10, price: '$12.95' },
      { id: 216, name: "Laptop Pro 15 variant 2", numberAvailable: 12, price: '$10.05' },
    ]
  },
  {
    id: 2, imageUrl: 'https://cataas.com/cat?width=102', url: '/', name: "Wireless Mouse", numberAvailable: 12, price: '$10.05',
    variants: [
      { id: 582, name: "Wireless Mouse variant 1", numberAvailable: 10, price: '$12.95' },
      { id: 577, name: "Wireless Mouse variant 2", numberAvailable: 12, price: '$10.05' },
    ]
  },
]

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/new" element={<NewComponent foo="FOOOO" products={products} />} />
          <Route path="/products" element={<Products products={products} tags={tags} productsToAdd={productsToAdd} />} />
          <Route path="/product" element={<ShowProduct productName="Laptop Pro 15" imageUrl="https://cataas.com/cat?width=102" />} />
          <Route path="/test" element={<ProductPreorderPage />} />

        </Routes>
      </Router>
    </AppProvider>
  </StrictMode>
)
