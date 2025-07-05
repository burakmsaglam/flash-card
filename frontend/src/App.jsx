import "./App.css";
import FlashCard from "./components/FlashCard/FlashCard";
import { nanoid } from "nanoid";
import React, { useState, useEffect, useRef } from "react";

function App() {
  let [currentElement, setCurrentElement] = useState(0);
  let isFetched = useRef(false);

  let [sides, setSides] = useState({
    front_side: "",
    back_side: "",
  });

  const [slider, setSlider] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/flashcards/")
      .then((res) => res.json())
      .then((data) => {
        if (!isFetched.current) {
          isFetched.current = true;
          data.forEach((val) => {
            handleNewCard(val.front_side, val.back_side);
          });
        }
      })
      .catch((err) => {
        console.error("API Connection Failed", err);
      });
  }, []);

  // Adds new card.
  function handleNewCard(front = sides.front_side, back = sides.back_side) {
    // From prev cards, add a new card.
    setSlider((prevCards) => {
      const newCards = [
        ...prevCards,
        <FlashCard key={nanoid()} front_side={front} back_side={back} />,
      ];

      setCurrentElement(newCards.length - 1);

      return newCards;
    });
  }

  // Deletes the current card.
  function handleDeleteCard(e) {
    // From prev cards, delete the current element.
    setSlider((prevCards) => {
      let tempSlider = [...prevCards];
      tempSlider.splice(currentElement, 1);

      const newIndex = currentElement - 1;
      // Calculate for new set of cards, do not depend on other state to be completed.
      const boundedIndex =
        tempSlider.length === 0
          ? 0
          : newIndex < 0
          ? tempSlider.length - 1
          : newIndex;

      // Setting new index seperately after calculating
      setCurrentElement(boundedIndex);

      return tempSlider;
    });
  }

  function handleSliderClick(e) {
    if (slider.length === 0) return; //Empty slider

    const direction = e.target.textContent === "<" ? -1 : 1;

    setCurrentElement((prev) => {
      let newIndex = prev + direction;

      if (newIndex < 0) {
        return slider.length - 1;
      } else if (newIndex >= slider.length) {
        return 0;
      }

      return newIndex;
    });
  }

  return (
    <>
      <p>FlashCard #{slider.length === 0 ? 0 : currentElement + 1}</p>
      <ol>{slider[currentElement]}</ol>
      <button onClick={handleSliderClick}>{"<"}</button>
      <button onClick={handleSliderClick}>{">"}</button>
      <button onClick={handleNewCard}>✅ Make a new card.</button>
      <button onClick={handleDeleteCard}>🚮 Delete the current card.</button>
    </>
  );
}

export default App;
