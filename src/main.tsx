import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import SignUp from "./components/SignUp";
import AddSet from "./components/AddSet";
import Set from "./components/Set";
import AddExpense from "./components/AddExpense";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="add" element={<AddSet />} />
        <Route path="/:id" element={<Set />} />
        <Route path="/:id/add" element={<AddExpense />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
