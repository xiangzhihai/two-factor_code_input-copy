import { useEffect, useRef } from 'react';
import './App.css';

const CORRECT_VALUES = '2024';

function App() {
  const inputRef1 = useRef<HTMLInputElement | null>(null);
  const inputRef2 = useRef<HTMLInputElement | null>(null);
  const inputRef3 = useRef<HTMLInputElement | null>(null);
  const inputRef4 = useRef<HTMLInputElement | null>(null);
  const inputRefArrays = [inputRef1, inputRef2, inputRef3, inputRef4];
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    inputRef1.current?.focus();
  }, []);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (
      inputRefArrays.every(
        (inputRef, index) => inputRef.current?.value === CORRECT_VALUES[index]
      )
    ) {
      alert('Validation Success!');
      inputRefArrays.forEach((inputRef) => (inputRef.current!.value = ''));
    } else {
      alert('Validation Failed! Please adjust your input');
    }
  }

  function handleInput(
    inputRef: React.MutableRefObject<HTMLInputElement | null>,
    nextRefToFocus: React.MutableRefObject<
      HTMLInputElement | HTMLButtonElement | null
    >
  ) {
    const value = inputRef.current?.value || '';

    // Check if the value is a single digit (0-9)
    if (!/^\d$/.test(value)) {
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    } else {
      nextRefToFocus.current?.focus();
    }
  }

  function handleKeyDown(
    event: React.KeyboardEvent<HTMLInputElement>,
    inputRef: React.MutableRefObject<HTMLInputElement | null>,
    prevRefToFocus: React.MutableRefObject<HTMLInputElement | null> | null
  ) {
    if (event.key === 'Backspace') {
      if (inputRef.current) {
        inputRef.current.value = '';
      }
      if (prevRefToFocus?.current) {
        prevRefToFocus.current.focus();
      }
    }
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            ref={inputRef1}
            maxLength={1}
            onInput={() => handleInput(inputRef1, inputRef2)}
            onKeyUp={(e) => handleKeyDown(e, inputRef1, null)} // No previous input for the first field
          />
          <input
            type="text"
            ref={inputRef2}
            maxLength={1}
            onInput={() => handleInput(inputRef2, inputRef3)}
            onKeyUp={(e) => handleKeyDown(e, inputRef2, inputRef1)}
          />
          <input
            type="text"
            ref={inputRef3}
            maxLength={1}
            onInput={() => handleInput(inputRef3, inputRef4)}
            onKeyUp={(e) => handleKeyDown(e, inputRef3, inputRef2)}
          />
          <input
            type="text"
            ref={inputRef4}
            maxLength={1}
            onInput={() => handleInput(inputRef4, buttonRef)}
            onKeyUp={(e) => handleKeyDown(e, inputRef4, inputRef3)}
          />
        </div>
        <button ref={buttonRef} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
