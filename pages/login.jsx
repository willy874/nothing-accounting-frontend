import Link from "next/link";
import { useState } from "react/cjs/react.development";

function LoginLabel({ label, value, handleChange }) {
  return (
    <label className="mb-2 block">
      <span className="block">{label}</span>
      <input
        type="text"
        placeholder={label}
        onInput={handleChange}
        value={value}
        className="w-full border border-solid border-black"
      />
      <p>
        {label}: {value}
      </p>
    </label>
  );
}

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmailChange(event) {
    const value = event.target.value;
    setEmail(value);
  }

  function handlePasswordChange(event) {
    const value = event.target.value;
    setPassword(value);
  }

  function checkLoginData(email, password) {
    if (email === "admin" && password === "admin") {
      return true;
    }
  }

  function handleSubmit() {
    checkLoginData(email, password);
  }

  return (
    <section className="flex flex-col gap-4 px-4">
      <h1 className="text-lg">登入頁面</h1>

      <form>
        <LoginLabel
          label="Email"
          value={email}
          handleChange={handleEmailChange}
        />

        <LoginLabel
          label="Password"
          value={password}
          handleChange={handlePasswordChange}
        />
      </form>

      <div className="border border-solid border-blue-500">
        <button
          className="w-full bg-blue-400 p-4"
          type="submit"
          onClick={handleSubmit}
        >
          登入
        </button>
      </div>

      <div className="rounded-sm border border-solid border-gray-500 px-4 py-2 shadow-sm">
        <p>還沒有帳號嗎？</p>
        <Link href="/signup">
          <a>註冊</a>
        </Link>
      </div>
    </section>
  );
}
