import "../styles/globals.css";
import { useState } from "react";
import Context from "@/context/index";

function MyApp({ Component, pageProps }) {
  const [state, setContext] = useState({
    a: "aa",
  });
  return (
    <Context.Provider value={{ state, setContext }}>
      <Component {...pageProps} />
    </Context.Provider>
  );
}

export default MyApp;
