import { useTodo } from "./contexts/TodoContext";
import AddTodo from "./components/AddTodo";
import TodoItem from "./components/TodoItem";

function App() {
  const { todos } = useTodo();

  return (
    <div className="bg-stone-800 min-h-screen w-full text-neutral-200 text-center p-6 space-y-6 mx-auto">
      <h1 className="text-4xl font-semibold">Your todos</h1>
      <AddTodo />
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}

export default App;
