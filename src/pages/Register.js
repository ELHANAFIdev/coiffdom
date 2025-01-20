import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("client");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
        role,
      });

      // Sauvegarder le token et le rôle dans localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);

      // Rediriger l'utilisateur en fonction de son rôle
      if (response.data.role === "client") {
        navigate("/client-dashboard");
      } else {
        navigate("/"); // Autre redirection pour d'autres rôles
      }
    } catch (err) {
      setError("Échec de l'inscription : " + err.response?.data?.error || err.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-pink-100 via-pink-200 to-red-200">
      <form onSubmit={handleSubmit} className="p-8 bg-white rounded-lg shadow-2xl max-w-md w-full">
        <h2 className="text-3xl font-extrabold text-center text-pink-800 mb-6">Créer un compte</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Nom"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border-2 border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Adresse e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border-2 border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border-2 border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />
        </div>
        <div className="mb-6">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-3 border-2 border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            <option value="client">Client</option>
            <option value="coiffeur">Coiffeur</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full p-3 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition duration-200"
        >
          S'inscrire
        </button>
        <p className="mt-4 text-center text-gray-600">
          Vous avez déjà un compte ?{" "}
          <Link to="/login" className="text-pink-600 hover:underline">
            Connectez-vous ici
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
