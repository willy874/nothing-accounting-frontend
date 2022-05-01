import Link from "next/link";

export default function Home() {
  return (
    <section>
      <h1>登入頁面</h1>

      <label htmlFor="username">帳號</label>
      <input type="text" name="username" />

      <label htmlFor="username">密碼</label>
      <input type="text" name="password" />

      <button>登入</button>

      <p>還沒有帳號嗎？</p>
      <Link href="/signup">
        <a>註冊</a>
      </Link>
    </section>
  );
}
