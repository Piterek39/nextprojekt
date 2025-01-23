import Link from "next/link";
import { FaUser, FaSignInAlt, FaHome, FaUserPlus } from "react-icons/fa";
import { AuthProvider } from "@/app/lib/AuthContext";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex h-screen antialiased">
        {/* Pasek boczny */}
        <aside className="w-64 bg-gray-800 text-white flex flex-col">
          <div className="p-4 text-lg font-bold">Menu</div>
          <nav className="flex-1">
            <ul className="space-y-4 px-4">
              <li>
                <Link href="/" className="flex items-center gap-2 hover:text-blue-300">
                  <FaHome /> Strona Główna
                </Link>
              </li>
              <li>
                <Link href="/user/signin" className="flex items-center gap-2 hover:text-blue-300">
                  <FaSignInAlt /> Logowanie
                </Link>
              </li>
              <li>
                <Link href="/user/register" className="flex items-center gap-2 hover:text-blue-300">
                  <FaUserPlus /> Rejestracja
                </Link>
              </li>
              <li>
                <Link href="/user/profile" className="flex items-center gap-2 hover:text-blue-300">
                  <FaUser /> Profil
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Główna część strony */}
        <main className="flex-1 flex flex-col">
          {/* Górny pasek */}
          <header className="bg-gray-200 shadow p-4 flex justify-between items-center">
            <div className="text-xl font-bold">FrontendLaboratoryApp</div>
            <div>
            <AuthProvider>{children}</AuthProvider>
              {/* <Link href="/user/signin" className="mr-4 text-blue-600 hover:underline">
                Zaloguj się
              </Link>
              <Link href="/user/register" className="text-blue-600 hover:underline">
                Zarejestruj się
              </Link> */}
            </div>
          </header>

          {/* Treść */}
          {/* <div className="flex-1 bg-gray-100 p-6">{children}</div> */}

          {/* Stopka */}
          <footer className="bg-gray-800 text-white text-center p-4">
            © 2025 FrontendLaboratoryApp. Wszelkie prawa zastrzeżone.
          </footer>
        </main>
      </body>
    </html>
  );
}
