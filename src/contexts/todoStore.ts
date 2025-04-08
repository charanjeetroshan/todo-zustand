import { create } from "zustand"
import { Todo } from "../types"

type TodoStore = {
   todos: Todo[]
   setTodos: (todos: Todo[]) => void
   addTodo: (todo: Todo) => void
   updateTodo: (todoId: string, todoMessage: string) => void
   removeTodo: (todoId: string) => void
   toggleTodo: (todoId: string) => void
}

export const useTodoStore = create<TodoStore>((set) => ({
   todos: [],
   setTodos: (todos) => {
      set({
         todos,
      })
   },
   addTodo: (todo) => {
      set((state) => ({
         todos: [...state.todos, todo],
      }))
   },
   updateTodo: (todoId, todoMessage) => {
      set((state) => ({
         todos: state.todos.map((todo) =>
            todo.id === todoId ? { ...todo, todoMessage: todoMessage } : todo,
         ),
      }))
   },
   removeTodo: (todoId) => {
      set((state) => ({
         todos: state.todos.filter((todo) => todo.id !== todoId),
      }))
   },
   toggleTodo: (todoId) => {
      set((state) => ({
         todos: state.todos.map((todo) =>
            todo.id === todoId ? { ...todo, isCompleted: !todo.isCompleted } : todo,
         ),
      }))
   },
}))
