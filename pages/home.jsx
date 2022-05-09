import { Provider } from "react-redux";
import { selectRecords } from "@/store/slice/record";
import store from "@/store";
import Card from "@/components/record/Card";
import DataMap from "@/components/DataMap";

export default function Home() {
  const renderComponent = (el) => (
    <Card key={el.id} memo={el.memo} dollars={el.dollars}></Card>
  );

  return (
    <Provider store={store}>
      <div className="my-60 mx-20 mt-20">
        <DataMap slice={selectRecords} renderComponent={renderComponent} />
      </div>
    </Provider>
  );
}
