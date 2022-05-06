import Link from "next/link";
import { useState } from "react/cjs/react.development";
import LoginLabel from "./components/LoginLabel";

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

  function checkInput(email, password) {
    const EMAIL_REGEX =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const validateEmail = EMAIL_REGEX.test(email);
    const validatePassword = !!password.trim() && password.length > 0;

    return { validateEmail, validatePassword };
  }

  function checkLoginInfo(emailState, passwordState) {
    console.log("checkLoginInfo", emailState, passwordState);
    // TODO: submit email and password to server check account information

    if (emailState && passwordState) {
      console.log("login success");
      // return <div>登入成功</div>;
    } else {
      console.log("login fail");
      // return <div>登入失敗</div>;
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log("submit the login data: ", email, password);

    const { validateEmail, validatePassword } = checkInput(email, password);
    console.log(checkInput(email, password));

    checkLoginInfo(validateEmail, validatePassword);
  }
  async function testData(query) {
    const options = {
      method: "GET",
      body: JSON.stringify(query),
    };
    console.log(query);
    const res = await fetch("/api/users");
    const data = await res.json();
    console.log("test data: ", data);
  }
  testData({ eamil: "test@qq.com" });

  return (
    <section className="flex flex-col gap-4 px-4">
      <h1 className="text-lg">登入頁面</h1>

      <form onSubmit={handleSubmit}>
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
        <input
          className="w-full cursor-pointer bg-blue-400 p-4"
          type="submit"
          value="登入"
          onClick={handleSubmit}
        />
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
