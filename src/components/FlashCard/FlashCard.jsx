import ModifiableInput from "../ModifiableInput/ModifiableInput";
import { useState } from "react";
import styles from "./FlashCard.module.css";
// Or you can use: import {name the components} from "source link"

export default function FlashCard() {
  const side = {
    front: "",
    back: "",
  };

  const [flipped, setFlipped] = useState(false);
  const [ftext, fsetText] = useState(side);

  function handleTextChange(side, inputText) {
    fsetText((prevState) => ({ ...prevState, [side]: inputText }));
  }

  return (
    <>
      <div className="flash-card">
        {/*Used arrow function to not directly call the function each time the component*/}
        {flipped ? (
          <ModifiableInput
            className={styles.front}
            text={ftext.front}
            setText={(newText) => handleTextChange("front", newText)}
          />
        ) : (
          <ModifiableInput
            className={styles.back}
            text={ftext.back}
            setText={(newText) => handleTextChange("back", newText)}
          />
        )}
        <button
          onClick={() => (flipped ? setFlipped(false) : setFlipped(true))}
        >
          Flip
        </button>
      </div>
    </>
  );
}
