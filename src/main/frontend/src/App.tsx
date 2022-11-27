import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import VotingSessionsPage from "./Pages/VotingSessionsPage";
import LoginPage from "./Pages/LoginPage";
import AuthenticatedOnly from "./Components/AuthenticatedOnly";
import NotFoundPage from "./Pages/NotFoundPage";
import ErrorPage from "./Pages/ErrorPage";


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path = '/' element={<AuthenticatedOnly><VotingSessionsPage/></AuthenticatedOnly>}/>
        <Route path = 'login' element={<LoginPage/>}/>
        <Route path = 'error' element={<ErrorPage/>}/>
        <Route path = '*' element = {<NotFoundPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
