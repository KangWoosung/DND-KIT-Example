/*  2024-02-19 17:26:11


*/
import { useState } from "react";

import "./Input.css";

type InputProps = {
  onSubmit: (title: string) => void;
};

export const Input = ({ onSubmit }: InputProps) => {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (!input) return;

    onSubmit(input);

    setInput("");
  };

  return (
    <div className="container">
      <input
        className="input"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleSubmit} className="button">
        Add
      </button>
    </div>
  );
};
