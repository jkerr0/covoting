import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VotingSessionsPage from "./Pages/VotingSessionsPage";
import LoginPage from "./Pages/LoginPage";
import AuthenticatedOnly from "./Components/AuthenticatedOnly";
import NotFoundPage from "./Pages/NotFoundPage";
import ErrorPage from "./Pages/ErrorPage";
import { QueryClient, QueryClientProvider } from "react-query";
import { Credentials, findCredentials } from "Services/auth-service";
import { AuthContext } from "Utils/AuthContext";
import VotingControlPage from "Pages/VotingControlPage";
import VotingPage from "Pages/VotingPage";
import { StompSessionProvider } from "react-stomp-hooks";
import ResultsPage from "Pages/ResultsPage";

const queryClient = new QueryClient();

function App() {
  const [credentials, setCredentials] = useState<Credentials | null>(
    findCredentials().credentials || null
  );

  return (
    <BrowserRouter>
      <StompSessionProvider url={"http://localhost:8080/api/covotingLiveApp"}>
        <QueryClientProvider client={queryClient}>
          <AuthContext.Provider value={{ credentials, setCredentials }}>
            <Routes>
              <Route
                path="/"
                element={
                  <AuthenticatedOnly>
                    <VotingSessionsPage />
                  </AuthenticatedOnly>
                }
              />
              <Route
                path="voting-control/:id"
                element={
                  <AuthenticatedOnly>
                    <VotingControlPage invalidParamUrl={"/voting-control"} />
                  </AuthenticatedOnly>
                }
              />
              <Route
                path="voting/:id"
                element={
                  <AuthenticatedOnly>
                    <VotingPage invalidParamUrl="/voting" />
                  </AuthenticatedOnly>
                }
              />
              <Route
                path="results/:id"
                element={
                  <AuthenticatedOnly>
                    <ResultsPage invalidParamUrl="/results" />
                  </AuthenticatedOnly>
                }
              />
              <Route path="login" element={<LoginPage />} />
              <Route path="error" element={<ErrorPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </AuthContext.Provider>
        </QueryClientProvider>
      </StompSessionProvider>
    </BrowserRouter>
  );
}

export default App;
