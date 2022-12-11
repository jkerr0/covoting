import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VotingSessionsPage from "./Pages/VotingSessionsPage";
import LoginPage from "./Pages/LoginPage";
import AuthenticatedOnly from "./Components/AuthenticatedOnly";
import NotFoundPage from "./Pages/NotFoundPage";
import ErrorPage from "./Pages/ErrorPage";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route
            path="/"
            element={
              <AuthenticatedOnly>
                <VotingSessionsPage />
              </AuthenticatedOnly>
            }
          />
          <Route path="login" element={<LoginPage />} />
          <Route path="error" element={<ErrorPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
