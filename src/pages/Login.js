import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      // Sauvegarder le token et le rôle dans localStorage
      localStorage.setItem("token", response.data.token);
      const user = response.data.user;
      localStorage.setItem("role", user.role);
      localStorage.setItem("user", JSON.stringify(user));
      // Rediriger l'utilisateur en fonction de son rôle
      switch (user.role) {
        case "admin":
          navigate("/admin-dashboard");
          break;
        case "client":
          navigate("/client-dashboard");
          break;
        case "coiffeur":
          navigate("/coiffeur-dashboard");
          break;
        default:
          navigate("/");
      }
    } catch (err) {
      setError("L'adresse e-mail ou le mot de passe est incorrect");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-pink-100 via-pink-200 to-red-200">
      <form onSubmit={handleSubmit} className="p-8 bg-white rounded-lg shadow-2xl max-w-md w-full">
        <h2 className="text-3xl font-extrabold text-center text-pink-800 mb-6">Connexion</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
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
        <button
          type="submit"
          className="w-full p-3 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition duration-200"
        >
          Se connecter
        </button>
        <p className="mt-4 text-center text-gray-600">
          Vous n'avez pas de compte ?{" "}
          <a href="/register" className="text-pink-600 hover:underline">
            Inscrivez-vous ici
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
