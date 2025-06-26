import React from 'react'
import { hydrateRoot, createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './tailwind.css'     // only the client needs to import CSS

const container = document.getElementById('root')
const WrappedApp = (
    <BrowserRouter>
        <App />
    </BrowserRouter>
)

if (container.hasChildNodes()) {
    hydrateRoot(container, WrappedApp)
}   else {
    createRoot(container).render(WrappedApp)
}
