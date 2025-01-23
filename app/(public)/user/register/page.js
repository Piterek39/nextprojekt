'use client';

import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, signOut } from "firebase/auth";
import { useAuth } from "@/app/lib/AuthContext";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const { user } = useAuth();
  const router = useRouter();
  const auth = getAuth();

  // Stany lokalne
  const [registerError, setRegisterError] = useState(""); // Stan błędu
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Obsługa zmiany wartości w formularzu
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Obsługa submita
  const onSubmit = (e) => {
    e.preventDefault();
    const { email, password, confirmPassword } = formData;

    // Walidacja haseł
    if (password !== confirmPassword) {
      setRegisterError("Hasła nie są zgodne!");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("User registered!");
        sendEmailVerification(auth.currentUser)
          .then(() => {
            console.log("Email verification sent!");
            signOut(auth); // Automatyczne wylogowanie po rejestracji
            router.push("/user/verify"); // Przekierowanie do strony weryfikacji
          });
      })
      .catch((error) => {
        setRegisterError(error.message); // Ustawienie błędu
        console.error(error);
      });
  };

  // Jeśli użytkownik jest zalogowany, nie pokazujemy formularza rejestracji
//   if (user) {
//     return null;
//   }


  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl mb-4">Zarejestruj się</h2>
      {registerError && (
        <div className="alert alert-error mb-4">
          <span>{registerError}</span>
        </div>
      )}
      <form onSubmit={onSubmit}>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Wprowadź email"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Hasło</span>
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Wprowadź hasło"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Powtórz hasło</span>
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Powtórz hasło"
            className="input input-bordered"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Zarejestruj się
        </button>
      </form>
    </div>
  );
}
