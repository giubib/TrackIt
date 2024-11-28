import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserProvider from "./Contexts/UserContext";
import LoginPage from "./Pages/LoginPage";
import JoinPage from "./Pages/JoinPage";

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/join" element={<JoinPage />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
