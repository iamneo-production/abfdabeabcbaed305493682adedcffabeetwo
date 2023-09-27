import React, { useState, useEffect } from "react";
import "./App.css";

import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    setIsAuthenticated(JSON.parse(localStorage.getItem("is_authenticated")));
  }, []);

  return (
    <>
      {isAuthenticated ? (
        <Dashboard setIsAuthenticated={setIsAuthenticated} />
      ) : (
        <Login setIsAuthenticated={setIsAuthenticated} />
      )}
    </>
  );
};

export default App;
