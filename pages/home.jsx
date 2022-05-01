import { Provider } from "react-redux";
import store from "@/store";
import CardGroup from "@/components/record/CardGroup";

export default function Home() {
  return (
    <Provider store={store}>
      <div className="my-60 mx-20 mt-20">
        <CardGroup />
      </div>
    </Provider>
  );
}
