export default function LoginLabel({ label, value, handleChange }) {
  return (
    <label className="mb-2 block">
      <span className="block">{label}</span>
      <input
        type="text"
        placeholder={label}
        onChange={handleChange}
        value={value}
        className="w-full border border-solid border-black"
      />
      <p>
        {label}: {value}
      </p>
    </label>
  );
}
