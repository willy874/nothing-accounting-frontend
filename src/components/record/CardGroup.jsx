import { useSelector } from "react-redux";
import { selectRecords } from "@/store/slice/record";
import Card from "./Card";

export default function CardGroup() {
  const states = useSelector(selectRecords);
  // TODO 日期分成一個區塊

  return (
    <>
      {states.map((el) => (
        <Card key={el.id} memo={el.memo} dollars={el.dollars}></Card>
      ))}
    </>
  );
}
