import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import LenisProvider from "./components/LenisProvider.jsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <LenisProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </LenisProvider>
    </ThemeProvider>
  </StrictMode>
);
