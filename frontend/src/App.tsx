import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Redirect from "./components/Redirect";
import { Start } from "./components/StartPage";

function App() {
  return (
    <div className="background">
      <div className="container">
        <Router>
          <Routes>
            <Route path="/" element={<Start />} />
            <Route path="/callback" element={<Redirect />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
