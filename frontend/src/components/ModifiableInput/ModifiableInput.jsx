import React, { useState, useRef, useEffect } from "react";

function ModifiableInput({ className, text, setText }) {
  /*
    When user click, show input until clicked outside (maybe also add enter to get out of the event).
    When clicked outside delete event listener and update the text. (useEffect should be used).
   */
  const [isEditing, setIsEditing] = useState(false);
  let inputRef = useRef(null);

  function handleEditing(e) {
    // if user did not click on the input, make the input not visible.
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      setIsEditing(false);
    } else if (inputRef.current && e.key === "Enter") {
      setIsEditing(false);
    }
  }

  // handle outside clicks or enter
  useEffect(() => {
    if (isEditing) {
      document.addEventListener("mousedown", handleEditing);
      document.addEventListener("keydown", handleEditing);
    }

    // clean up
    return () => {
      document.removeEventListener("mousedown", handleEditing);
      document.removeEventListener("keydown", handleEditing);
    };
  }, [isEditing]);

  // when clicked outside show the text
  return (
    <>
      {/*When user click on input have input visible, when click outside make it invisible.*/}
      {isEditing ? (
        <input
          className={className}
          ref={inputRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write here..."
        />
      ) : (
        <h2 className={className} onClick={() => setIsEditing(true)}>
          {text === "" ? "Write here..." : text}
        </h2>
      )}
    </>
  );
}
export default ModifiableInput;
