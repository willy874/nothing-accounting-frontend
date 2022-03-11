import "../styles/globals.css";
import { GlobalContext } from "@/context";

function App({ Component, pageProps }) {
  return (
    <GlobalContext>
      <Component {...pageProps} />
    </GlobalContext>
  );
}

export default App;
