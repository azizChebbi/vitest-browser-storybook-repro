import { useState } from "react";

interface SelectOption {
  readonly value: string;
  readonly label: string;
}

interface SelectProps {
  readonly options: SelectOption[];
  readonly value?: string;
  readonly onChange?: (value: string) => void;
  readonly disabled?: boolean;
  readonly placeholder?: string;
}

export function Select({
  options,
  value = "",
  onChange,
  disabled = false,
  placeholder = "Select an option...",
}: SelectProps) {
  const [selectedValue, setSelectedValue] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    setSelectedValue(newValue);
    onChange?.(newValue);
  };

  return (
    <select
      value={selectedValue}
      onChange={handleChange}
      disabled={disabled}
      style={{
        padding: "8px 12px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        fontSize: "14px",
        outline: "none",
        width: "200px",
        backgroundColor: disabled ? "#f5f5f5" : "white",
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
