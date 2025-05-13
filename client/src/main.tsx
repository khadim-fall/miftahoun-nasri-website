import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Add Font Awesome icons
const fontAwesomeScript = document.createElement('script');
fontAwesomeScript.src = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/js/all.min.js";
fontAwesomeScript.async = true;
document.head.appendChild(fontAwesomeScript);

// Set meta tags for SEO
const metaDesc = document.createElement('meta');
metaDesc.name = 'description';
metaDesc.content = 'Dahira Miftahoun Nasri de Guediawaye-Notaire - Une communauté spirituelle dédiée à l\'enseignement et à la pratique des valeurs Mourides';
document.head.appendChild(metaDesc);

// Set title for the page
document.title = "Dahira Miftahoun Nasri - Guediawaye-Notaire";

createRoot(document.getElementById("root")!).render(<App />);
