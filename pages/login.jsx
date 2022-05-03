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
        className="border border-solid border-black"
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

  return (
    <section className="flex flex-col gap-4 px-4">
      <h1 className="text-lg">登入頁面</h1>

      <form>
        <LoginLabel
          label="Email"
          value={email}
          handleChange={(e) => setEmail(e.target.value)}
        />

        <LoginLabel
          label="Password"
          value={password}
          handleChange={(e) => setPassword(e.target.value)}
        />
      </form>

      <button className="block w-2/3 bg-blue-400 p-2">登入</button>

      <div className="rounded-sm border border-solid border-gray-500 px-4 py-2 shadow-sm">
        <p>還沒有帳號嗎？</p>
        <Link href="/signup">
          <a>註冊</a>
        </Link>
      </div>
    </section>
  );
}
