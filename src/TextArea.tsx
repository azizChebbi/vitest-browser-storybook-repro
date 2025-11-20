import { useState } from "react";

interface TextAreaProps {
  readonly placeholder?: string;
  readonly value?: string;
  readonly onChange?: (value: string) => void;
  readonly disabled?: boolean;
  readonly rows?: number;
  readonly maxLength?: number;
}

export function TextArea({
  placeholder = "Enter text...",
  value = "",
  onChange,
  disabled = false,
  rows = 4,
  maxLength,
}: TextAreaProps) {
  const [internalValue, setInternalValue] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setInternalValue(newValue);
    onChange?.(newValue);
  };

  return (
    <div>
      <textarea
        placeholder={placeholder}
        value={internalValue}
        onChange={handleChange}
        disabled={disabled}
        rows={rows}
        maxLength={maxLength}
        style={{
          padding: "8px 12px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          fontSize: "14px",
          outline: "none",
          width: "300px",
          resize: "vertical",
          fontFamily: "inherit",
        }}
      />
      {Boolean(maxLength) && (
        <div
          style={{
            fontSize: "12px",
            color: "#666",
            textAlign: "right",
            marginTop: "4px",
          }}
        >
          {internalValue.length}/{maxLength}
        </div>
      )}
    </div>
  );
}
