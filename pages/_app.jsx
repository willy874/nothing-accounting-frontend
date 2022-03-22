import "../styles/globals.css";
import { Provider } from "@/contexts";
import { DispatchType } from "@/enums";

function App({ Component, pageProps }) {
  const onDidMount = (store) => {
    store.dispatch(
      DispatchType.SET_STORAGE_SETTING,
      (settings) => (settings.storage = window.localStorage)
    );
    console.log("onDidMount:state", store.state);
    console.log("onDidMount:getters", store.getters);
  };
  const onDidUpdate = (store) => {
    console.log("onDidUpdate:state", store.state);
    console.log("onDidUpdate:getters", store.getters);
  };
  return (
    <Provider onDidMount={onDidMount} onDidUpdate={onDidUpdate}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default App;
