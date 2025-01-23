"use client";

import { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useAuth } from "@/app/lib/AuthContext";

export default function VerifyEmail() {
  const { user } = useAuth();
  const [email, setEmail] = useState(null);

  useEffect(() => {
    const auth = getAuth();

    // Sprawdzenie, czy użytkownik istnieje
    if (user) {
      // Zapamiętaj adres e-mail użytkownika
      setEmail(user.email);

      // Automatyczne wylogowanie użytkownika
      signOut(auth)
        .then(() => {
          console.log("User signed out after registration.");
        })
        .catch((error) => {
          console.error("Error during sign out:", error.message);
        });
    }
  }, [user]);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Email Verification Required</h1>
      <p>
        We have sent a verification link to your email address:{" "}
        <strong>{email || "loading..."}</strong>
      </p>
      <p>
        Please verify your email by clicking on the link provided in the email
        to activate your account.
      </p>
    </div>
  );
}
