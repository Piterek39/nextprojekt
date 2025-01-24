import React, { useState, useEffect } from "react";

// Komponent Wykreślanki
const WordSearch = ({ gridSize, wordList, styles }) => {
  const [grid, setGrid] = useState([]);
  const [selectedCells, setSelectedCells] = useState([]);
  const [foundWords, setFoundWords] = useState([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false); // Flaga błędu

  const maxWordLength = Math.max(...wordList.map(word => word.length)); // Maksymalna długość słowa w słowniku

  // Funkcja do wstawiania słów w siatce
  const placeWordsInGrid = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let newGrid = Array.from({ length: gridSize }, () =>
      Array.from({ length: gridSize }, () => "")
    );

    wordList.forEach((word) => {
      let placed = false;

      while (!placed) {
        const row = Math.floor(Math.random() * gridSize);
        const col = Math.floor(Math.random() * gridSize);
        const direction = Math.floor(Math.random() * 3); // 0: horizontal, 1: vertical, 2: diagonal

        if (canPlaceWord(newGrid, word, row, col, direction)) {
          placeWord(newGrid, word, row, col, direction);
          placed = true;
        }
      }
    });

    // Uzupełnij resztę siatki losowymi literami
    newGrid = newGrid.map((row) =>
      row.map((cell) => (cell === "" ? letters.charAt(Math.floor(Math.random() * letters.length)) : cell))
    );

    setGrid(newGrid);
  };

  // Sprawdzenie, czy można wstawić słowo w siatce (poziomo, pionowo, ukośnie)
  const canPlaceWord = (grid, word, row, col, direction) => {
    if (direction === 0) { // poziomo
      if (col + word.length > gridSize) return false;
      for (let i = 0; i < word.length; i++) {
        if (grid[row][col + i] !== "" && grid[row][col + i] !== word[i]) return false;
      }
    } else if (direction === 1) { // pionowo
      if (row + word.length > gridSize) return false;
      for (let i = 0; i < word.length; i++) {
        if (grid[row + i][col] !== "" && grid[row + i][col] !== word[i]) return false;
      }
    } else { // ukośnie
      if (row + word.length > gridSize || col + word.length > gridSize) return false;
      for (let i = 0; i < word.length; i++) {
        if (grid[row + i][col + i] !== "" && grid[row + i][col + i] !== word[i]) return false;
      }
    }
    return true;
  };

  // Wstawienie słowa w siatce (poziomo, pionowo, ukośnie)
  const placeWord = (grid, word, row, col, direction) => {
    if (direction === 0) { // poziomo
      for (let i = 0; i < word.length; i++) {
        grid[row][col + i] = word[i];
      }
    } else if (direction === 1) { // pionowo
      for (let i = 0; i < word.length; i++) {
        grid[row + i][col] = word[i];
      }
    } else { // ukośnie
      for (let i = 0; i < word.length; i++) {
        grid[row + i][col + i] = word[i];
      }
    }
  };

  // Inicjalizacja siatki
  useEffect(() => {
    placeWordsInGrid();
  }, [gridSize, wordList]);

  // Obsługa zaznaczania liter
  const handleCellClick = (row, col) => {
    if (success || error) return; // Nie pozwalaj na zaznaczenie, jeśli gra zakończona lub jest błąd

    // Sprawdzanie, czy kliknięta komórka jest obok ostatnio zaznaczonej
    if (selectedCells.length > 0) {
      const lastSelected = selectedCells[selectedCells.length - 1];
      const isAdjacent = isAdjacentTo(lastSelected, { row, col });

      // Zaznaczaj tylko wtedy, gdy komórka jest obok
      if (!isAdjacent) return;
    }

    // Ograniczenie długości zaznaczenia
    if (selectedCells.length >= maxWordLength) return;

    const cell = { row, col };
    const isAlreadySelected = selectedCells.some((c) => c.row === row && c.col === col);

    if (!isAlreadySelected) {
      setSelectedCells([...selectedCells, cell]);
    }
  };

  // Funkcja do sprawdzenia, czy komórka jest obok
  const isAdjacentTo = (cell1, cell2) => {
    const rowDiff = Math.abs(cell1.row - cell2.row);
    const colDiff = Math.abs(cell1.col - cell2.col);
    return (rowDiff <= 1 && colDiff <= 1) && !(rowDiff === 0 && colDiff === 0);
  };

  // Sprawdzanie, czy zaznaczone słowo jest w słowniku
  useEffect(() => {
    if (selectedCells.length > 1) {
      const selectedWord = selectedCells
        .map(({ row, col }) => grid[row][col])
        .join("");

      if (wordList.includes(selectedWord)) {
        const wordCells = selectedCells;
        setFoundWords([...foundWords, { word: selectedWord, cells: wordCells }]);
        setSelectedCells([]); // Zresetowanie zaznaczenia
        setError(false); // Resetowanie błędu
      } else if (selectedCells.length >= maxWordLength) {
        setError(true); // Ustawienie błędu, gdy słowo jest błędne
        setSelectedCells([]); // Zresetowanie zaznaczenia
      }
    }
  }, [selectedCells, grid, wordList, foundWords, gridSize]);

  // Sprawdzanie sukcesu
  useEffect(() => {
    if (foundWords.length === wordList.length) {
      setSuccess(true);
    }
  }, [foundWords, wordList]);

  // Resetowanie zaznaczenia po błędnym słowie
  useEffect(() => {
    if (error) {
      setSelectedCells([]); // Zresetowanie zaznaczenia po błędzie
      setError(false); // Zresetowanie flagi błędu
    }
  }, [error]);

  return (
    <div>
      <h1>Word Search Game</h1>
      {success && <h2 style={{ color: "green" }}>Congratulations! You found all the words!</h2>}
      {error && <h2 style={{ color: "red" }}>Incorrect word! Try again.</h2>}

      <div
        // style={{
        //   display: "grid",
        //   gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
        //   gap: "5px",
        //   ...styles.board,
        style={{
            display: "grid",
            gridTemplateColumns: `repeat(${gridSize}, 40px)`, // Stała szerokość dla każdej komórki
            gridTemplateRows: `repeat(${gridSize}, 40px)`, // Stała wysokość dla każdej komórki
            gap: "0", // Brak odstępów między komórkami
           // border: "1px solid black", // Zewnętrzne obramowanie siatki
             margin: "0 auto", // Wyrównanie siatki do środka (opcjonalne, jeśli chcesz, żeby była wyśrodkowana)
             padding: "5px",          
            ...styles.board,
        }}
      >
        {grid.map((row, rowIndex) =>
          row.map((letter, colIndex) => {
            const isSelected = selectedCells.some((c) => c.row === rowIndex && c.col === colIndex);
            const isFound = foundWords.some((foundWord) =>
              foundWord.cells.some((cell) => cell.row === rowIndex && cell.col === colIndex)
            );

            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                onClick={() => handleCellClick(rowIndex, colIndex)}
                style={{
                  padding: "0",
                  textAlign: "center",
                  border: "1px solid black",               
                  backgroundColor: isFound ? "lightgreen" : isSelected ? "lightblue" : "white",
                  cursor: "pointer",
                  ...styles.cell,
                }}
              >
                {letter}
              </div>
            );
          })
        )}
      </div>

      <div>
        <h3>Found Words:</h3>
        <ul>
          {foundWords.map((wordObj, index) => (
            <li key={index}>{wordObj.word}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WordSearch;
