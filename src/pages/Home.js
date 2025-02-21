import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createRoom, checkRoomExists } from "../api"; // ✅ Fixed Imports
import "../styles.css";

const Home = () => {
  const [roomCode, setRoomCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // ✅ Create a New Room (Backend Generates Room Code)
  const handleCreateRoom = async () => {
    try {
      const newRoomCode = await createRoom();
      navigate(`/room/${newRoomCode}`);
    } catch (error) {
      setError("❌ Failed to create room. Try again.");
    }
  };

  // ✅ Join an Existing Room
  const handleJoinRoom = async () => {
    setError("");

    if (!roomCode) {
      setError("⚠️ Please enter a room code.");
      return;
    }

    const exists = await checkRoomExists(roomCode);
    if (exists) {
      navigate(`/room/${roomCode}`);
    } else {
      setError("❌ Room not found! Please check the code.");
    }
  };

  return (
    <div className="container">
      <h1>Welcome to Task Rooms</h1>

      <button className="btn" onClick={handleCreateRoom}>Create a New Room</button>

      <div style={{ marginTop: "20px" }}>
        <input
          type="text"
          placeholder="Enter Room Code"
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
        />
        <button className="btn" onClick={handleJoinRoom}>Join Room</button>
      </div>

      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Home;
