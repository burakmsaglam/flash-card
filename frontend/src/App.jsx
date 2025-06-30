import "./App.css";
import FlashCard from "./components/FlashCard/FlashCard";
import { nanoid } from "nanoid";
import React, { useState } from "react";

function App() {
  let [currentElement, setCurrentElement] = useState(0);

  const [slider, setSlider] = useState(
    // Add number to show which card is user is on. Or do sometings else to show I dunno.
    []
  );

  // Adds new card.
  function handleNewCard() {
    // From prev cards, add a new card.
    setSlider((prevCards) => [...prevCards, <FlashCard key={nanoid()} />]);
    setCurrentElement(++currentElement);
  }

  // Deletes the current card.
  function handleDeleteCard(e) {
    // From prev cards, delete the current element.
    setSlider((prevCards) => {
      let tempSlider = [...prevCards];
      tempSlider.splice(currentElement, 1);
      setCurrentElement(--currentElement);
      return tempSlider;
    });
  }

  function handleSliderClick(e) {
    if (e.target.textContent === "<") {
      setCurrentElement(--currentElement);
      if (currentElement < 0) {
        setCurrentElement(slider.length);
      }
    } else if (e.target.textContent === ">") {
      setCurrentElement(++currentElement);
      if (currentElement >= slider.length) {
        setCurrentElement(0);
      }
    }
  }

  return (
    <>
      <p>FlashCard #{currentElement}</p>
      <ol>{slider[currentElement]}</ol>
      <button onClick={handleSliderClick}>{"<"}</button>
      <button onClick={handleSliderClick}>{">"}</button>
      <button onClick={handleNewCard}>✅ Make a new card.</button>
      <button onClick={handleDeleteCard}>🚮 Delete the current card.</button>
      {console.log(slider)}
    </>
  );
}

export default App;
