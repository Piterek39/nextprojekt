'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Strona nie znaleziona</h1>
      <p className="text-lg text-gray-600 mb-8">
        Przepraszamy, ale strona, której szukasz, nie istnieje.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
      >
        Wróć na stronę główną
      </Link>
    </div>
  );
}
