'use client';

import { signOut } from "firebase/auth";
import { auth } from "@/app/lib/firebase";
import { useRouter } from "next/navigation";

export default function LogoutForm() {
  const router = useRouter();

  const onSubmit = (e) => {
    e.preventDefault(); // Zapobiega domyślnej akcji formularza
    signOut(auth)
      .then(() => {
        router.push("/"); // Przekierowanie na stronę główną po wylogowaniu
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  };

  return (
    <form onSubmit={onSubmit} className="container mx-auto p-4">
      <button type="submit" className="btn btn-primary">
        Wyloguj się
      </button>
    </form>
  );
}
