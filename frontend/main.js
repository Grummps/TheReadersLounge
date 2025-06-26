import React from 'react'
import { hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './tailwind.css'     // only the client needs to import CSS

const container = document.getElementById('root')
hydrateRoot(
  container,
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
