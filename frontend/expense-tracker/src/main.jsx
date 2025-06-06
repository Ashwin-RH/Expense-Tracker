import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

/* 
createRoot(...) targets the <div id="root"></div> in your index.html.
It tells React:
"Render the <App /> component inside that root div."
Wrapping <App /> in <StrictMode> ensures React helps spot unsafe or outdated patterns in development.
*/