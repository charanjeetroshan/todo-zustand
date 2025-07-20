import AddTodo from "./components/AddTodo"
import Categories from "./components/Categories"
import { useTodoStore } from "./contexts/todoStore"

function App() {
   const todos = useTodoStore((store) => store.todos)

   return (
      <div className="bg-stone-800 min-h-screen w-full text-neutral-200 text-center p-6 space-y-6 mx-auto">
         <h1 className="text-4xl font-semibold">Your todos</h1>
         <AddTodo />
         <Categories todos={todos} />
      </div>
   )
}

export default App
