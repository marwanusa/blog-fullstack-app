import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppRouter from "./routes/AppRouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import AuthProvider from "./context/AuthProvider";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <>
        <Toaster richColors position="top-center" />
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </>
    </QueryClientProvider>
  </StrictMode>
);
