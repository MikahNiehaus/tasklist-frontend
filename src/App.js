import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Room from "./pages/Room";
import About from "./components/About";

import "./styles.css";

function App() {
  return (
    <Router>
      <nav className="navbar">
        <ul>
          <li><Link to="/">🏠 Home</Link></li>
          <li><Link to="/about">ℹ️ About</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/room/:roomCode" element={<Room />} />
      </Routes>
    </Router>
  );
}

export default App;
