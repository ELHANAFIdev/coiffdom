import React, { useState } from "react";
import axios from "axios";

const AddService = ({ coiffeurId }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    duration: "",
  });
  const [files, setFiles] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Vous devez vous connecter !");
      return;
    }

    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    files.forEach((file) => data.append("file", file));

    try {
      await axios.post("http://localhost:5000/api/services", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Service ajouté avec succès !");
      setFormData({ name: "", description: "", price: "", duration: "" });
      setFiles([]);
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'ajout du service.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Ajouter un service</h2>
      {["name", "description", "price", "duration"].map((field) => (
        <div key={field} className="mb-4">
          <label className="block font-medium mb-2">{field}</label>
          <input
            type="text"
            name={field}
            value={formData[field]}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
      ))}
      <input type="file" multiple onChange={handleFileChange} />
      <button className="bg-blue-600 text-white px-4 py-2 mt-4">Ajouter</button>
    </form>
  );
};

export default AddService;
