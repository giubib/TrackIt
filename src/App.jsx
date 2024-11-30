import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserProvider from "./Contexts/UserContext.jsx";
import LoginPage from "./Pages/LoginPage.jsx";
import JoinPage from "./Pages/JoinPage.jsx";
import { HabitsPage } from "./Pages/HabitsPage"
import TodayPage from "./Pages/TodayPage.jsx";

export default function App () {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/join" element={<JoinPage />} />
          <Route path="/habitos" element={<HabitsPage />} />
          <Route path="/hoje" element={<TodayPage />} />
         </Routes>
      </Router>
    </UserProvider>
  );
};


