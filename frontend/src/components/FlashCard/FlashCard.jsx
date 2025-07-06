import ModifiableInput from "../ModifiableInput/ModifiableInput";
import { useState, useEffect } from "react";
import styles from "./FlashCard.module.css";
// Or you can use: import {name the components} from "source link"

export default function FlashCard({ card, onUpdate }) {
  // Take all components if card is empty return empty object
  const { id, front_side, back_side } = card ?? {};

  const [flipped, setFlipped] = useState(false);
  // Setting front side and back side of the card to local front and back for rendering.
  const [text, setText] = useState({ front: front_side, back: back_side });

  // Update the local front and back when the card changes (basically sliding deleting or adding new cards)
  useEffect(() => {
    setText({ front: front_side, back: back_side });
  }, [id]);

  async function handleTextChange(side, inputText, id) {
    try {
      // Updating back end

      // Mapping local keys to backend keys
      const backendKey = side === "front" ? "front_side" : "back_side";

      const resp = await fetch(`http://127.0.0.1:8000/api/flashcards/${id}/`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [backendKey]: inputText }),
      });

      const updatedCard = await resp.json();
      // Updating front end
      setText((prevState) => ({ ...prevState, [side]: inputText }));
      if (onUpdate) {
        onUpdate(updatedCard);
      }
    } catch (err) {
      console.error("Failed updating. Error: ", err);
    }
  }

  return (
    <>
      <div className={`flash-card  ${flipped ? "flipped" : ""}`}>
        {/*Used arrow function to not directly call the function each time the component*/}
        {flipped ? (
          <ModifiableInput
            className={styles.front}
            text={text.front}
            setText={(newText) => handleTextChange("front", newText, id)}
          />
        ) : (
          <ModifiableInput
            className={styles.back}
            text={text.back}
            setText={(newText) => handleTextChange("back", newText, id)}
          />
        )}
      </div>
      <button
        className={styles.flipButton}
        onClick={() => (flipped ? setFlipped(false) : setFlipped(true))}
      >
        Flip
      </button>
    </>
  );
}
