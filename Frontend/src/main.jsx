import ReactDOM from "react-dom/client"; // Import ReactDOM for rendering React components
import App from "./App.jsx"; // Import the main application component
import "./index.css"; // Import CSS styles
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter for client-side routing

// Render the main application component wrapped in BrowserRouter to enable client-side routing
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
