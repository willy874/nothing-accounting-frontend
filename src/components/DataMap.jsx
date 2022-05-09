import { useSelector } from "react-redux";

export default function DataMap({ slice, renderComponent }) {
  const states = useSelector(slice);

  return <>{states.map((el) => renderComponent(el))}</>;
}
