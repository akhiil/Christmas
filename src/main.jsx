import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div style={{maxWidth: 600, backgroundColor: '#dbeafe', height: '100vh'}}>
    <App />
    </div>
  </StrictMode>,
)
