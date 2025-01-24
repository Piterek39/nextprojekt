import React from 'react';

const Home = () => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      <header style={{ textAlign: 'center', padding: '50px' }}>
        <h1>Witaj na stronie domowej aplikacji</h1>
        <p>Dowiedz się więcej o aplikacji i autorze poniżej!</p>
      </header>

      <main style={{ padding: '0 20px' }}>
        <section style={{ marginBottom: '40px' }}>
          <h2>O aplikacji</h2>
          <p>
            Jest to przykładowa aplikacja stworzona przy użyciu Next.js. Aplikacja
            pozwala zalogować się, zarejestrować się, przegladać informacje o profilu i co najważniejsze zagrać w grę Word Search.
          </p>
        </section>

        <section>
          <h2>O autorze</h2>
          <p>
            Autorem tej aplikacji jest Piotr Dudek, student pasjonujący się
            tworzeniem nowoczesnych aplikacji webowych. Wierzę w siłę prostoty i
            użyteczności.
          </p>
        </section>
      </main>

    
    </div>
  );
};

export default Home;