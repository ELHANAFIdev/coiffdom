import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [editUser, setEditUser] = useState(null); // L'utilisateur à modifier
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "", role: "client" }); // Données du nouvel utilisateur
  const navigate = useNavigate();

  // Récupérer tous les utilisateurs
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get("http://localhost:5000/api/admin/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data);
      } catch (err) {
        setError("Échec de la récupération des utilisateurs");
      }
    };

    fetchUsers();
  }, [navigate]);

  // Supprimer un utilisateur
  const handleDeleteUser = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/admin/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.filter((user) => user._id !== userId)); // Mise à jour de la liste après la suppression
    } catch (err) {
      setError("Échec de la suppression de l'utilisateur");
    }
  };

  // Activer/Désactiver un utilisateur
  const handleToggleUserStatus = async (userId, isActive) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/admin/users/${userId}/status`,
        { isActive: !isActive },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers(
        users.map((user) =>
          user._id === userId ? { ...user, isActive: !isActive } : user
        )
      );
    } catch (err) {
      setError("Échec de la mise à jour du statut de l'utilisateur");
    }
  };

  // Modifier un utilisateur
  const handleEditUser = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:5000/api/admin/users/${editUser._id}`,
        editUser,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers(users.map((user) => (user._id === editUser._id ? response.data : user)));
      setEditUser(null); // Fermer le formulaire de modification
    } catch (err) {
      setError("Échec de la modification de l'utilisateur");
    }
  };

  // Ajouter un nouvel utilisateur
  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/admin/users",
        newUser,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers([...users, response.data]);
      setNewUser({ name: "", email: "", password: "", role: "client" }); // Réinitialiser le formulaire
    } catch (err) {
      setError("Échec de l'ajout de l'utilisateur");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-200 p-6">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Tableau de bord de l'Administrateur</h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* Ajouter un nouvel utilisateur */}
        <div className="bg-white p-6 rounded shadow-md mb-6">
          <h2 className="text-xl font-bold mb-4">Ajouter un nouvel utilisateur</h2>
          <form onSubmit={handleAddUser} className="space-y-4">
            <input
              type="text"
              placeholder="Nom"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="password"
              placeholder="Mot de passe"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
            <select
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              className="w-full p-2 border rounded"
            >
              <option value="client">Client</option>
              <option value="coiffeur">Coiffeur</option>
              <option value="admin">Administrateur</option>
            </select>
            <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Ajouter un utilisateur
            </button>
          </form>
        </div>

        {/* Liste des utilisateurs */}
        <div className="bg-white p-6 rounded shadow-md">
          <h2 className="text-xl font-bold mb-4">Liste des utilisateurs</h2>
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left p-2">Nom</th>
                <th className="text-left p-2">Email</th>
                <th className="text-left p-2">Rôle</th>
                <th className="text-left p-2">État</th>
                <th className="text-left p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-t">
                  <td className="p-2">{user.name}</td>
                  <td className="p-2">{user.email}</td>
                  <td className="p-2">{user.role}</td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded ${user.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                    >
                      {user.isActive ? "Activé" : "Désactivé"}
                    </span>
                  </td>
                  <td className="p-2 space-x-2">
                    <button
                      onClick={() => setEditUser(user)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleToggleUserStatus(user._id, user.isActive)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      {user.isActive ? "Désactiver" : "Activer"}
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Formulaire de modification d'utilisateur */}
        {editUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-md w-96">
              <h2 className="text-xl font-bold mb-4">Modifier l'utilisateur</h2>
              <form onSubmit={handleEditUser} className="space-y-4">
                <input
                  type="text"
                  placeholder="Nom"
                  value={editUser.name}
                  onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={editUser.email}
                  onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
                <select
                  value={editUser.role}
                  onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}
                  className="w-full p-2 border rounded"
                >
                  <option value="client">Client</option>
                  <option value="coiffeur">Coiffeur</option>
                  <option value="admin">Administrateur</option>
                </select>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => setEditUser(null)}
                    className="w-full p-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                  >
                    Annuler
                  </button>
                  <button type="submit" className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600">
                    Enregistrer
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
