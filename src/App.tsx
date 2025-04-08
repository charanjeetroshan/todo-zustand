import { useEffect } from "react"
import AddTodo from "./components/AddTodo"
import TodoItem from "./components/TodoItem"
import { useTodoStore } from "./contexts/todoStore"

function App() {
   const todos = useTodoStore((store) => store.todos)
   const setTodos = useTodoStore((store) => store.setTodos)

   useEffect(() => {
      const todos = JSON.parse(localStorage.getItem("todos") ?? "{}")
      if (Array.isArray(todos) && todos.length > 0) {
         setTodos(todos)
      }
   }, [setTodos])

   useEffect(() => {
      localStorage.setItem("todos", JSON.stringify(todos))
   }, [todos])

   return (
      <div className="bg-stone-800 min-h-screen w-full text-neutral-200 text-center p-6 space-y-6 mx-auto">
         <h1 className="text-4xl font-semibold">Your todos</h1>
         <AddTodo />
         {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
         ))}
      </div>
   )
}

export default App
