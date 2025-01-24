'use client';

import { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/app/lib/firebase";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/lib/AuthContext";

export default function LogoutForm() {
  const [showModal, setShowModal] = useState(false); // Stan do kontrolowania widoczności modalu
  const { user } = useAuth(); // Sprawdzamy, czy użytkownik jest zalogowany
  const router = useRouter();

  // Efekt, aby wyświetlić modal po załadowaniu komponentu, jeśli użytkownik jest zalogowany
  useEffect(() => {
    if (user) {
      setShowModal(true); // Jeśli użytkownik jest zalogowany, pokazujemy modal
    }
  }, [user]);

  // Funkcja wylogowująca użytkownika
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        router.push("/"); // Przekierowanie na stronę główną po wylogowaniu
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  };

  return (
    <>
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl mb-4">Czy na pewno chcesz się wylogować?</h2>
            <div className="flex justify-around">
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Tak, wyloguj mnie
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
              >
                Anuluj
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
