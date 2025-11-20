import { useState } from "react";

interface CheckboxProps {
  readonly label?: string;
  readonly checked?: boolean;
  readonly onChange?: (checked: boolean) => void;
  readonly disabled?: boolean;
}

export function Checkbox({
  label = "Checkbox",
  checked = false,
  onChange,
  disabled = false,
}: CheckboxProps) {
  const [isChecked, setIsChecked] = useState(checked);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = e.target.checked;
    setIsChecked(newChecked);
    onChange?.(newChecked);
  };

  return (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
        disabled={disabled}
        style={{ cursor: disabled ? "not-allowed" : "pointer" }}
      />
      <span style={{ fontSize: "14px", color: disabled ? "#999" : "#000" }}>
        {label}
      </span>
    </label>
  );
}
