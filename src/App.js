import logo from "./components/images/logo192.png";
import React, {useState } from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import { AppProvider } from "./contexts/apps";
import Login from "./components/auth/Login";
import CandidateAdd from "./components/candidate/CandidateAdd";
import CandidateList from "./components/candidate/CandidateList";

function App() {

  const [collapsed, setCollapsed] = useState(true);
  const contextValue = { collapsed, setCollapsed, logo };

  return (
    <AppProvider value={contextValue}>
      <Routes>

        <Route path="" element={ <Dashboard /> } exact />
        <Route path="login" element={<Login />} />

        <Route path="/candidate" element={ <CandidateAdd /> } exact />
        <Route path="/candidates" element={ <CandidateList /> } exact />

      </Routes>

    </AppProvider>
  );
}

export default App;
