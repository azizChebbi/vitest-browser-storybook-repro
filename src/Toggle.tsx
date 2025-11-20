import { useState } from "react";

interface ToggleProps {
  readonly label?: string;
  readonly checked?: boolean;
  readonly onChange?: (checked: boolean) => void;
  readonly disabled?: boolean;
}

export function Toggle({
  label = "Toggle",
  checked = false,
  onChange,
  disabled = false,
}: ToggleProps) {
  const [isChecked, setIsChecked] = useState(checked);

  const handleChange = () => {
    if (disabled) return;
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    onChange?.(newChecked);
  };

  return (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.6 : 1,
      }}
    >
      <span style={{ fontSize: "14px" }}>{label}</span>
      <div
        role="switch"
        aria-checked={isChecked}
        tabIndex={disabled ? -1 : 0}
        onClick={handleChange}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleChange();
          }
        }}
        style={{
          width: "44px",
          height: "24px",
          backgroundColor: isChecked ? "#007acc" : "#ccc",
          borderRadius: "12px",
          position: "relative",
          transition: "background-color 0.2s",
          cursor: disabled ? "not-allowed" : "pointer",
          outline: "none",
        }}
      >
        <div
          style={{
            width: "20px",
            height: "20px",
            backgroundColor: "white",
            borderRadius: "50%",
            position: "absolute",
            top: "2px",
            left: isChecked ? "22px" : "2px",
            transition: "left 0.2s",
            boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
          }}
        />
      </div>
    </label>
  );
}
