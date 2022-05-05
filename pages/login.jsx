import Link from "next/link";
import { useState } from "react/cjs/react.development";

function LoginLabel({ label, value, handleChange }) {
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

const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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
    const validateEmail = email.match(EMAIL_REGEX);
    const validatePassword = !!password.trim() && password.length > 0;

    return { validateEmail, validatePassword };
  }

  function renderLoginStatus(emailState, passwordState) {
    console.log("renderLoginStatus", emailState, passwordState);

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

    const loginValidation = checkLoginData(email, password);
    console.log(checkLoginData(email, password));

    renderLoginStatus(
      loginValidation.validateEmail,
      loginValidation.validatePassword
    );
  }

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
