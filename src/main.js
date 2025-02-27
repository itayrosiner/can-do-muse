import React from "react"; // Ensure React is imported
import { createRoot } from "react-dom/client"; // Import from react-dom/client
import App from "./App.js"; // Ensure App.js exports a valid React component
import "./index.css"; // Import styles

// Get root element from DOM
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

// Render App component inside root
createRoot(rootElement).render(<App />);
