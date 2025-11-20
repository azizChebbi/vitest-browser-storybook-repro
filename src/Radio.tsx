import { useState } from "react";

interface RadioOption {
  readonly value: string;
  readonly label: string;
}

interface RadioProps {
  readonly name: string;
  readonly options: RadioOption[];
  readonly value?: string;
  readonly onChange?: (value: string) => void;
  readonly disabled?: boolean;
}

export function Radio({
  name,
  options,
  value = "",
  onChange,
  disabled = false,
}: RadioProps) {
  const [selectedValue, setSelectedValue] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSelectedValue(newValue);
    onChange?.(newValue);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {options.map((option) => (
        <label
          key={option.value}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            cursor: disabled ? "not-allowed" : "pointer",
          }}
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={handleChange}
            disabled={disabled}
            style={{ cursor: disabled ? "not-allowed" : "pointer" }}
          />
          <span style={{ fontSize: "14px", color: disabled ? "#999" : "#000" }}>
            {option.label}
          </span>
        </label>
      ))}
    </div>
  );
}
