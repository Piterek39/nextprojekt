'use client'
import React from "react";
import WordSearch from "@/app/components/wordsearch"; // Zaktualizuj ścieżkę importu

const WordSearchPage = () => {
  const wordList = ["CAT", "DOG", "FISH", "BIRD"];
  const gridSize = 10; // Możesz dostosować rozmiar siatki
  const styles = {
    board: {
      //border: "2px solid black",
      margin: "20px",
    },
    cell: {
      fontSize: "20px",
      fontWeight: "bold",
      width: "40px",
      height: "40px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "purple",
    },
  };

  return (
    <div>
      <h1>Welcome to Word Search Game</h1>
      <WordSearch gridSize={gridSize} wordList={wordList} styles={styles} />
    </div>
  );
};

export default WordSearchPage;
