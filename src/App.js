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
          <li><Link to="/">Home</Link></li> {/* Link to Home page */}
          <li><Link to="/about">About</Link></li> {/* Link to About page */}
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} /> {/* Route for Home page */}
        <Route path="/about" element={<About />} /> {/* Route for About page */}
        <Route path="/room/:roomCode" element={<Room />} /> {/* Route for Room page with dynamic roomCode */}
      </Routes>
    </Router>
  );
}

export default App;
