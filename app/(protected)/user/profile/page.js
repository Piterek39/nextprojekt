"use client";

import { useAuth } from "@/app/lib/AuthContext";
import { useState } from "react";
import { updateProfile } from "firebase/auth";

export default function ProfileForm() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    displayName: user?.displayName || "",
    photoURL: user?.photoURL || "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(user, {
      displayName: formData.displayName,
      photoURL: formData.photoURL,
    })
      .then(() => {
        console.log("Profile updated successfully!");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl mb-4">Profil użytkownika</h2>
      {error && (
        <div className="alert alert-error mb-4">
          <span>{error}</span>
        </div>
      )}
      <div className="mb-4">
        {user?.photoURL ? (
          <img
            src={user.photoURL}
            alt="Zdjęcie profilowe"
            className="rounded-full w-24 h-24 object-cover"
          />
        ) : (
          <div className="rounded-full w-24 h-24 bg-gray-300 flex items-center justify-center text-gray-500">
            Brak zdjęcia
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Nazwa użytkownika</span>
          </label>
          <input
            type="text"
            name="displayName"
            value={formData.displayName}
            onChange={handleChange}
            placeholder="Wprowadź nazwę użytkownika"
            className="input input-bordered"
          />
        </div>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">URL zdjęcia profilowego</span>
          </label>
          <input
            type="url"
            name="photoURL"
            value={formData.photoURL}
            onChange={handleChange}
            placeholder="Podaj URL zdjęcia profilowego"
            className="input input-bordered"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Zapisz
        </button>
      </form>
    </div>
  );
}
