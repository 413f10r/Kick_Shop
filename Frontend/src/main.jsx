import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

//bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'



import App from './App.jsx'
import '../src/css/index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
