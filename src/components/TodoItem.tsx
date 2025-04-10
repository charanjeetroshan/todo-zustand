import { Todo } from "../types"
import { useEffect, useRef, useState } from "react"
import { useTodoStore } from "../contexts/todoStore"
import { useShallow } from "zustand/shallow"

type TodoItemProps = {
   todo: Todo
}

function TodoItem({ todo }: TodoItemProps) {
   const [isEditing, setIsEditing] = useState(false)
   const [editedTodo, setEditedTodo] = useState(todo.todoMessage)
   const [isChecked, setIsChecked] = useState(false)

   const editTodoInputRef: React.LegacyRef<HTMLInputElement> | null = useRef(null)
   const editButtonRef: React.LegacyRef<HTMLButtonElement> | null = useRef(null)

   useEffect(() => {
      if (isEditing) {
         editTodoInputRef.current?.select()
      }

      document.addEventListener("click", (e) => {
         if (
            isEditing &&
            e.target !== editButtonRef.current &&
            e.target !== editTodoInputRef.current
         ) {
            setIsEditing(false)
            setEditedTodo(todo.todoMessage)
         }
      })
   }, [isEditing, todo])

   const { updateTodo, removeTodo, toggleTodo } = useTodoStore(
      useShallow((store) => ({
         updateTodo: store.updateTodo,
         removeTodo: store.removeTodo,
         toggleTodo: store.toggleTodo,
      })),
   )

   return (
      <div
         className={`bg-blue-800 max-w-3xl mx-auto transition-opacity p-3 rounded-sm min-h-[55px] grid items-center ${
            todo.isCompleted && "opacity-60"
         }`}
      >
         <div className="flex justify-between items-center">
            <div className="flex w-full gap-4">
               <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => {
                     setIsChecked((prev) => !prev)
                     toggleTodo(todo.id)
                  }}
               />
               {isEditing ? (
                  <input
                     ref={editTodoInputRef}
                     type="text"
                     className=" basis-2/3 border border-black/10 rounded-lg px-3 text-lg outline-none duration-150 bg-neutral-300 text-black"
                     value={editedTodo}
                     onChange={(e) => setEditedTodo(e.target.value)}
                     onKeyDown={(e) => {
                        if (e.key === "Enter") {
                           setIsEditing(false)
                           updateTodo(todo.id, editedTodo)
                        }
                     }}
                  />
               ) : (
                  <p
                     className={`text-lg px-2 transition-opacity text-left ${
                        todo.isCompleted && "line-through"
                     }`}
                     onClick={() => {
                        toggleTodo(todo.id)
                        setIsChecked((prev) => !prev)
                     }}
                  >
                     {todo.todoMessage}
                  </p>
               )}
            </div>
            <div className="flex gap-4">
               {isEditing ? (
                  <button
                     type="button"
                     title="Save todo"
                     ref={editButtonRef}
                     onClick={() => {
                        setIsEditing(false)
                        updateTodo(todo.id, editedTodo)
                     }}
                  >
                     Save
                  </button>
               ) : (
                  <button
                     type="button"
                     title="Edit todo"
                     ref={editButtonRef}
                     onClick={() => setIsEditing(true)}
                  >
                     Edit
                  </button>
               )}
               <button type="button" title="Delete todo" onClick={() => removeTodo(todo.id)}>
                  Delete
               </button>
            </div>
         </div>
      </div>
   )
}

export default TodoItem
