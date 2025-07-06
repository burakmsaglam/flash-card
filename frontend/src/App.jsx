import "./App.css";
import FlashCard from "./components/FlashCard/FlashCard";
import { nanoid } from "nanoid";
import React, { useState, useEffect, useRef } from "react";

function App() {
  let [currentElement, setCurrentElement] = useState(0);
  let isFetched = useRef(false);

  const [slider, setSlider] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/flashcards/`)
      .then((res) => res.json())
      .then((data) => {
        if (!isFetched.current) {
          // Prevent double render
          isFetched.current = true;

          setSlider((prev) => {
            const newCards = [...prev, ...data];
            setCurrentElement(newCards.length - 1);
            return newCards;
          });
        }
      })
      .catch((err) => {
        console.error("API Connection Failed", err);
      });
  }, []);

  // Adds new card. ID generated in backend when we push. Then on that id we use and update on front end.
  async function handleNewCard(front = "Back Side", back = "Front Side") {
    try {
      // Push to backend
      const res = await fetch("http://127.0.0.1:8000/api/flashcards/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ front_side: front, back_side: back }),
      });

      // Updating to front end, POST Method also returns newly made cards' JSON.
      const newCard = await res.json();

      // From prev cards, add a new card.
      setSlider((prevCards) => {
        const newCards = [...prevCards, newCard];
        setCurrentElement(newCards.length - 1);
        return newCards;
      });
    } catch (err) {
      console.error("New card can not be made right now. Error: ", err);
    }
  }

  async function handleDeleteCard(idToDelete) {
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/flashcards/${idToDelete}/`,
        {
          method: "DELETE",
        }
      );
      if (!res.ok) throw new Error("Failed to delete card");

      setSlider((prev) => {
        // filter
        const filtered = prev.filter((card) => card.id !== idToDelete);
        // set current element
        setCurrentElement((prevIndex) => {
          const newLenght = slider.length - 1;
          // Return 0 or the max for index
          return newLenght === 0 ? 0 : Math.max(0, prevIndex - 1);
        });
        return filtered;
      });
    } catch (err) {
      console.log("Failed deleting. Error : ", err);
    }
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
      <div className="app-container">
        <p className="card-counter">
          FlashCard #{slider.length === 0 ? 0 : currentElement + 1}
        </p>
        <div className="flashcard-container">
          {slider.length > 0 ? (
            <FlashCard
              card={slider[currentElement]}
              onUpdate={(updatedCard) => {
                // Update slider
                setSlider((prev) =>
                  prev.map((c) => (c.id === updatedCard.id ? updatedCard : c))
                );
              }}
            />
          ) : (
            <p>No Flashcard Available</p>
          )}
        </div>
        <div className="button-row">
          <button onClick={handleSliderClick}>{"<"}</button>
          <button onClick={handleSliderClick}>{">"}</button>
          <button onClick={() => handleNewCard()}>+</button>
          <button onClick={() => handleDeleteCard(slider[currentElement].id)}>
            -
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
