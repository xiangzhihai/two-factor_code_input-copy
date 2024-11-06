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

  function handleInput(event: React.FormEvent<HTMLInputElement>,
    inputRef: React.MutableRefObject<HTMLInputElement | null>) {
    if (!/^\d$/.test(event.currentTarget.value)) {
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }
  }

  function handleKeyUp(
    event: React.KeyboardEvent<HTMLInputElement>,
    inputRef: React.MutableRefObject<HTMLInputElement | null>,
    prevRefToFocus: React.MutableRefObject<HTMLInputElement | null> | null,
    nextRefToFocus: React.MutableRefObject<
      HTMLInputElement | HTMLButtonElement | null
    >
  ) {
    event.preventDefault();
    if (event.key === 'Backspace') {
      if (inputRef.current) {
        inputRef.current.value = '';
      }
      if (prevRefToFocus?.current) {
        prevRefToFocus.current.focus();
      }
    } else if (/^\d$/.test(event.key)) {
      if (inputRef.current) {
        inputRef.current.value = event.key;
      }
      nextRefToFocus.current?.focus();
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
            onInput={(e) => handleInput(e, inputRef1)}
            onKeyUp={(e) => handleKeyUp(e, inputRef1, null, inputRef2)} // No previous input for the first field
          />
          <input
            type="text"
            ref={inputRef2}
            maxLength={1}
            onInput={(e) => handleInput(e, inputRef2)}
            onKeyUp={(e) => handleKeyUp(e, inputRef2, inputRef1, inputRef3)}
          />
          <input
            type="text"
            ref={inputRef3}
            maxLength={1}
            onInput={(e) => handleInput(e, inputRef3)}
            onKeyUp={(e) => handleKeyUp(e, inputRef3, inputRef2, inputRef4)}
          />
          <input
            type="text"
            ref={inputRef4}
            maxLength={1}
            onInput={(e) => handleInput(e, inputRef4)}
            onKeyUp={(e) => handleKeyUp(e, inputRef4, inputRef3, buttonRef)}
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
