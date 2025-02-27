import { createRoot } from "react-dom/client";
import App from "./App.js"; // Ensure App.js exports a valid React component
import "./index.css";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

// Convert JSX <App /> to pure JavaScript using React.createElement
createRoot(rootElement).render(React.createElement(App, null));
