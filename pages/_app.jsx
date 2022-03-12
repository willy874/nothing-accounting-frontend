import "../styles/globals.css";
import { GlobalProvider } from "@/context";

function App({ Component, pageProps }) {
  return (
    <GlobalProvider>
      <Component {...pageProps} />
    </GlobalProvider>
  );
}

export default App;
