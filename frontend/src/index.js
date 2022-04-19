import { createRoot } from 'react-dom/client'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

const appElement = document.getElementById('app')
const root = createRoot(appElement)

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
