// Frontend/src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ClientDashboard from "./pages/ClientDashboard";
import CoiffeurDashboard from "./pages/CoiffeurDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import BookingPage from "./pages/BookingPage";

function App() {
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/client-dashboard" element={<ClientDashboard />} />
        <Route path="/coiffeur-dashboard" element={<CoiffeurDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/booking/:serviceId" element={<BookingPage />} />
      </Routes>
    </Router>
  );
}

export default App;