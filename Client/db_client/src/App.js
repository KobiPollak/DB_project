import logo from "./logo.svg";
import "./App.css";

import React, { useState } from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  redirect as Redirect,
  Navigate,
} from "react-router-dom";

import HomePage from "./components/homepage";
import Manager from "./components/manager";

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage />;
      case "manager":
        return <Manager />;
      default:
        return <HomePage />;
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <nav className="navbar">
        <ul>
          <li>
            <div className="nav" onClick={() => handlePageChange("home")}>
              Home
            </div>
          </li>
          <li>
            <div className="nav" onClick={() => handlePageChange("manager")}>
              Manager
            </div>
          </li>
        </ul>
      </nav>
      <div>{renderPage()}</div>
    </div>
  );
}

export default App;
