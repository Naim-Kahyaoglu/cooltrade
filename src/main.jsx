import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';  // Tailwind CSS ve diğer stil dosyalarını yükledik

createRoot(document.getElementById('root')).render(
  <Router>
    <App />
  </Router>
);

