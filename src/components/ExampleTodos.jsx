import { useSelector, useDispatch } from "react-redux";
import { addTodo, selectTodos } from "@/store/slice/exampleTodo";

export default function ExampleTodos() {
  const states = useSelector(selectTodos);
  const dispatch = useDispatch();
  const handleAdd = () => dispatch(addTodo("a new todo"));

  return (
    <ul>
      {states.todolist.map((el) => (
        <li key={el.id}>{el.name}</li>
      ))}
      <button onClick={handleAdd}>add</button>
    </ul>
  );
}
