import MuiTextField from "@mui/material/TextField";

// Every text field in the app goes through this file, so it is the only one that knows we use MUI.
//TextField does not remember the text itself. The page that uses it needs a useState,
//and gives TextField the current text (value) and the function to update it (onChange).

export default function TextField({
  id,
  label,
  type,
  required,
  value,
  onChange,
}) {
  return (
    <MuiTextField
      id={id}
      label={label}
      type={type}
      required={required}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      fullWidth
      // A date field always shows a placeholder (dd/mm/yyyy), so the label must stay
      // above the field from the start, or the two are drawn on top of each other
      slotProps={type === "date" ? { inputLabel: { shrink: true } } : undefined}
    />
  );
}
