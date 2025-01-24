// 'use client'; // Dodajemy 'use client' dla komponentów działających po stronie klienta

// import { useAuth } from "@/app/lib/AuthContext";
// import Link from "next/link";
// //import LogoutForm from "@/app/user/signout"; // Importujemy komponent wylogowywania

// function Menu() {
//     const { user } = useAuth(); // Sprawdzamy, czy użytkownik jest zalogowany

//     return (
//         <nav className="bg-gray-800 text-white w-64 p-6 h-screen fixed">
//             <ul style={{ listStyleType: 'none', padding: '0' }}>
//                 {/* Linki widoczne dla wszystkich */}
//                 <li className="py-2">
//                     <Link href="/" className="text-white hover:text-blue-300">Strona Główna</Link>
//                 </li>
//                 {!user && (
//                     <>
//                         <li className="py-2">
//                             <Link href="/user/register" className="text-white hover:text-blue-300">Rejestracja</Link>
//                         </li>
//                         <li className="py-2">
//                             <Link href="/user/signin" className="text-white hover:text-blue-300">Logowanie</Link>
//                         </li>
//                     </>
//                 )}
//                 {/* Linki widoczne tylko dla zalogowanych użytkowników */}
//                 {user && (
//                     <>
//                         <li className="py-2">
//                             <Link href="/user/wordsearch" className="text-white hover:text-blue-300">Wykreślanka</Link>
//                         </li>
//                         <li className="py-2">
//                             <Link href="/user/profile" className="text-white hover:text-blue-300">Profil</Link>
//                         </li>
//                         <li className="py-2">
//                         <Link href="/user/signout" className="text-white hover:text-blue-300">Wyloguj</Link>
//                         </li>
//                     </>
//                 )}
//             </ul>
//         </nav>
//     );
// }

// export default Menu;
'use client'; // Dodajemy 'use client' dla komponentów działających po stronie klienta

import { useAuth } from "@/app/lib/AuthContext";
import Link from "next/link";

function Menu() {
  const { user } = useAuth(); // Sprawdzamy, czy użytkownik jest zalogowany

  return (
    <nav className="bg-gray-800 text-white w-64 p-6 h-screen fixed top-0 left-0">
      <ul className="list-none p-0">
        {/* Linki widoczne dla wszystkich */}
        <li className="py-2">
          <Link href="/" className="text-white hover:text-blue-300">Strona Główna</Link>
        </li>
        {!user && (
          <>
            <li className="py-2">
              <Link href="/user/register" className="text-white hover:text-blue-300">Rejestracja</Link>
            </li>
            <li className="py-2">
              <Link href="/user/signin" className="text-white hover:text-blue-300">Logowanie</Link>
            </li>
          </>
        )}
        {/* Linki widoczne tylko dla zalogowanych użytkowników */}
        {user && (
          <>
            <li className="py-2">
              <Link href="/user/wordsearch" className="text-white hover:text-blue-300">Wykreślanka</Link>
            </li>
            <li className="py-2">
              <Link href="/user/profile" className="text-white hover:text-blue-300">Profil</Link>
            </li>
            <li className="py-2">
              <Link href="/user/signout" className="text-white hover:text-blue-300">Wyloguj</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Menu;
