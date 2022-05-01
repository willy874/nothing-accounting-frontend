import Link from "next/link";

export default function Home() {
  return (
    <section>
      <h1>註冊頁面</h1>

      <label htmlFor="nickname">暱稱</label>
      <input type="text" name="nickname" />

      <label htmlFor="username">帳號</label>
      <input type="text" name="username" />

      <label htmlFor="password">密碼</label>
      <input type="text" name="password" />

      <label htmlFor="check-password">確認密碼</label>
      <input type="text" name="check-password" />

      <button>註冊</button>

      <p>已經有帳號了嗎？</p>
      <Link href="/login">
        <a>登入</a>
      </Link>
    </section>
  );
}
