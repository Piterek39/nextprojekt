import { useAuth } from "@/app/lib/AuthContext";
import { AuthProvider } from "@/app/lib/AuthContext";
import Menu from "@/app/components/menu"; // Importujemy komponent Menu
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex h-screen antialiased">
        <AuthProvider>
          {/* Pasek boczny */}
          <aside className="w-64 bg-gray-800 text-white flex flex-col">
            <div className="p-4 text-lg font-bold">Menu</div>
            {/* Menu nawigacyjne */}
            <Menu /> {/* Dodajemy komponent Menu */}
          </aside>

          {/* Główna część strony */}
          <main className="flex-1 flex flex-col">
            {/* Górny pasek */}
            <header >
              {/* Inne elementy nagłówka */}
            </header>

            {/* Treść */}
            <div className="flex-1  p-6">{children}</div>

            {/* Stopka */}
            <footer className="bg-gray-800 text-white text-center p-4">
              © 2025 ProjektNext. Wszelkie prawa zastrzeżone.
            </footer>
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
