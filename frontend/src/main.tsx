import { createRoot } from "react-dom/client";
import Providers from "./app/provider.tsx";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <Providers>
    <App />
  </Providers>,
);
