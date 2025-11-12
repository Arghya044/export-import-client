import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { HelmetProvider } from "react-helmet-async";
import AuthProvider from "./contex/AuthContext";
import AppRoutes from "./routes/routes";
import "./App.css";

export default function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <BrowserRouter>
          <Toaster position="top-center" />
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </HelmetProvider>
  );
}
