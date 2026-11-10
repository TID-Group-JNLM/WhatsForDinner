//a label and an input that belongs together. Use it for every text field in a form.
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
    <>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </>
  );
}
