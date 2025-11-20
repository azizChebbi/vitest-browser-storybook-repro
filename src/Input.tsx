import { useState } from "react";

interface InputProps {
  readonly placeholder?: string;
  readonly value?: string;
  readonly onChange?: (value: string) => void;
  readonly disabled?: boolean;
}

export function Input({
  placeholder = "Enter text...",
  value = "",
  onChange,
  disabled = false,
}: InputProps) {
  const [internalValue, setInternalValue] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInternalValue(newValue);
    onChange?.(newValue);
  };

  return (
    <input
      type="text"
      placeholder={placeholder}
      value={internalValue}
      onChange={handleChange}
      disabled={disabled}
      style={{
        padding: "8px 12px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        fontSize: "14px",
        outline: "none",
        width: "200px",
      }}
    />
  );
}
