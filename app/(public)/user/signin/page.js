'use client'
import { signInWithEmailAndPassword, setPersistence, browserSessionPersistence } from "firebase/auth";
import { getAuth } from 'firebase/auth'
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react"; // Importowanie useState dla przechowywania błędów

export default function SignInForm() {
  // Uzyskanie dostępu do instancji autoryzacji Firebase
  const auth = getAuth();
  const params = useSearchParams(); // Pobranie parametrów URL (np. returnUrl)
  const router = useRouter();
  const returnUrl = params.get("returnUrl"); // Parametr 'returnUrl' z URL

  // Stan przechowujący błędy
  const [error, setError] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault(); // Zatrzymanie domyślnego działania formularza
    const email = e.target["name"].value; // Pobranie wartości email z formularza
    const password = e.target["password"].value; // Pobranie wartości hasła z formularza

    // Ustawienie trwałości sesji użytkownika
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        signInWithEmailAndPassword(auth, email, password) // Próba logowania
          .then((userCredential) => {
            // Jeśli logowanie powiodło się, przekierowanie na stronę docelową (returnUrl)
            if (returnUrl) {
              router.push(returnUrl); // Przekierowanie do returnUrl, jeśli istnieje
            } else {
              router.push('/'); // Jeśli nie ma returnUrl, przejdź do strony głównej
            }
          })
          .catch((error) => {
            // Obsługa błędów logowania: zamiast logować do konsoli, wyświetl błąd w formularzu
            const errorCode = error.code;
            const errorMessage = error.message;
            setError(`Błąd logowania: ${errorMessage}`); // Ustawienie błędu do wyświetlenia w formularzu
          });
      })
      .catch((error) => {
        console.log(error); // Obsługa błędów związanych z ustawieniem sesji
      });
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl mb-4">Zaloguj się</h2>
      
      {/* Komponent Alert z DaisyUI do wyświetlania błędów */}
      {error && (
        <div className="alert alert-error mb-4">
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block">Email</label>
          <input
            id="name"
            type="email"
            name="name"
            placeholder="Wprowadź email"
            required
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="password" className="block">Hasło</label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Wprowadź hasło"
            required
            className="border p-2 w-full"
          />
        </div>
        <div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Zaloguj się
          </button>
        </div>
      </form>
    </div>
  );
}
