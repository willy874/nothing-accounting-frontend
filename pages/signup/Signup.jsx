import Link from "next/link";

export default function Home() {
  return (
    <section className="flex flex-col gap-4 px-4">
      <h1>註冊頁面</h1>
      <form>
        <label className="mb-2 block">
          <span className="block">Nickname</span>
          <input
            type="text"
            placeholder="nickname"
            className="border border-solid border-black"
          />
        </label>

        <label className="block">
          <span className="block">Username</span>
          <input
            type="text"
            placeholder="username"
            className="border border-solid border-black"
          />
        </label>

        <label className="block">
          <span className="block">Password</span>
          <input
            type="text"
            placeholder="password"
            className="border border-solid border-black"
          />
        </label>

        <label className="block">
          <span className="block">Check Password</span>
          <input
            type="text"
            placeholder="check-password"
            className="border border-solid border-black"
          />
        </label>
      </form>

      <button className="block w-2/3 bg-blue-400 p-2">註冊</button>

      <div className="rounded-sm border border-solid border-gray-500 px-4 py-2 shadow-sm">
        <p>已經有帳號了嗎？</p>
        <Link href="/login">
          <a>登入</a>
        </Link>
      </div>
    </section>
  );
}
