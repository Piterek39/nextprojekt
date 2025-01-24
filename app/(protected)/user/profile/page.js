'use client';

import { useAuth } from "@/app/lib/AuthContext";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { updateProfile } from "firebase/auth";
import { db } from "@/app/lib/firebase"; // Import bazy danych
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function ProfileForm() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true); // Blokowanie edycji pól do momentu załadowania danych
  const [error, setError] = useState(""); // Obsługa błędów
  const [photoURL, setPhotoURL] = useState(user?.photoURL || ""); // Obsługa zdjęcia profilowego

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: user?.email,
      displayName: user?.displayName,
      photoURL: user?.photoURL,
      city: "",
      street: "",
      zipCode: "",
    },
  });

  useEffect(() => {
    async function fetchUserAddress() {
      if (!user?.uid) return;
      try {
        const snapshot = await getDoc(doc(db, "users", user?.uid));
        if (snapshot.exists()) {
          const address = snapshot.data().address;
          setValue("city", address.city);
          setValue("zipCode", address.zipCode);
          setValue("street", address.street);
        }
      } catch (err) {
        setError("Nie udało się załadować adresu użytkownika.");
      } finally {
        setLoading(false); // Odblokowanie pól po załadowaniu danych
      }
    }

    fetchUserAddress();
  }, [user, setValue]);

  const onSubmit = async (data) => {
    try {
      // Aktualizacja profilu użytkownika
      await updateProfile(user, {
        displayName: data.displayName,
        photoURL: data.photoURL,
      });

      // Aktualizacja adresu w kolekcji users
      await setDoc(doc(db, "users", user?.uid), {
        address: {
          city: data.city,
          street: data.street,
          zipCode: data.zipCode,
        },
      });

      console.log("Profile and address updated successfully!");
    } catch (err) {
      setError("Nie udało się zaktualizować profilu.");
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl mb-4">Twój profil</h2>

      {error && (
        <div className="alert alert-error mb-4">
          <span>{error}</span>
        </div>
      )}

      {/* Warunkowe wyświetlanie zdjęcia profilowego */}
      {photoURL && (
        <div className="mb-4">
          <img
            src={photoURL}
            alt="Zdjęcie profilowe"
            className="rounded-full w-32 h-32 object-cover mx-auto"
          />
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            {...register("email")}
            placeholder="Email"
            className="input input-bordered"
            disabled // Pole email tylko do odczytu
          />
        </div>

        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Nazwa wyświetlana</span>
          </label>
          <input
            type="text"
            {...register("displayName")}
            placeholder="Nazwa wyświetlana"
            className="input input-bordered"
            disabled={loading}
          />
        </div>

        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Adres URL zdjęcia</span>
          </label>
          <input
            type="text"
            {...register("photoURL")}
            placeholder="Adres URL zdjęcia"
            className="input input-bordered"
            disabled={loading}
            onChange={(e) => setPhotoURL(e.target.value)} // Aktualizacja lokalnego stanu zdjęcia
          />
        </div>

        <h3 className="text-xl mt-6 mb-4">Adres użytkownika</h3>

        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Ulica</span>
          </label>
          <input
            type="text"
            {...register("street")}
            placeholder="Ulica"
            className="input input-bordered"
            disabled={loading}
          />
        </div>

        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Miasto</span>
          </label>
          <input
            type="text"
            {...register("city")}
            placeholder="Miasto"
            className="input input-bordered"
            disabled={loading}
          />
        </div>

        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Kod pocztowy</span>
          </label>
          <input
            type="text"
            {...register("zipCode")}
            placeholder="Kod pocztowy"
            className="input input-bordered"
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading} // Blokowanie przycisku, gdy dane są ładowane
        >
          Zapisz zmiany
        </button>
      </form>
    </div>
  );
}
