import Home from "./components/Home";
import React from "react";
import { Route, Routes } from "react-router-dom";
import JoinRoom from "./components/JoinRoom";
import CreateRoom from "./components/CreateRoom";
import Room from "./components/Room";
import AdminRoom from "./components/AdminRoom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="join" element={<JoinRoom />} />
        <Route path="create" element={<CreateRoom />} />
        <Route path="room" element={<Room />} />
        <Route path="adminRoom" element={<AdminRoom />} />
      </Routes>
    </div>
  );
}

export default App;
