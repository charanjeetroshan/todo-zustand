import { useState } from "react"
import { nanoid } from "nanoid"
import { useTodoStore } from "../contexts/todoStore"

function AddTodo() {
   const [todo, setTodo] = useState("")
   const addTodo = useTodoStore((store) => store.addTodo)

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (!todo) {
         return
      }
      addTodo({ id: nanoid(), todoMessage: todo })
      setTodo("")
   }

   return (
      <form onSubmit={handleSubmit} className="flex max-w-3xl mx-auto">
         <input
            type="text"
            placeholder="Write a todo..."
            className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-2"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
         />
         <button type="submit" className="rounded-r-lg px-6 bg-green-600 text-white shrink-0">
            Add
         </button>
      </form>
   )
}

export default AddTodo
