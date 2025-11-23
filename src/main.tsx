import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ErrorBoundary } from './components/ErrorBoundary'

console.log('main.tsx loaded')

const rootElement = document.getElementById('root')
if (!rootElement) {
  console.error('Root element not found!')
  throw new Error('Root element not found')
}

console.log('Root element found, rendering app...')

try {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>,
  )
  console.log('App rendered successfully')
} catch (error) {
  console.error('Failed to render app:', error)
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="padding: 20px; color: red; background: white; min-height: 100vh;">
        <h1>Error Loading App</h1>
        <p>${error instanceof Error ? error.message : 'Unknown error'}</p>
        <p>Check the console for more details.</p>
        <pre>${error instanceof Error ? error.stack : String(error)}</pre>
      </div>
    `
  }
}

