import "../styles/globals.css";
import { Provider } from "@/contexts";

function App({ Component, pageProps }) {
  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  );
}

export default App;
