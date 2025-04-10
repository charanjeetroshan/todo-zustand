import { create, StateCreator } from "zustand"
import { Todo } from "../types"
import { devtools, persist } from "zustand/middleware"

type TodoStore = {
   todos: Todo[]
   addTodo: (todo: Todo) => void
   updateTodo: (todoId: string, todoMessage: string) => void
   removeTodo: (todoId: string) => void
   toggleTodo: (todoId: string) => void
}

const todoStore: StateCreator<TodoStore> = (set) => ({
   todos: [],
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
})

const persistedStore: StateCreator<TodoStore, [], [["zustand/persist", TodoStore]]> = persist(
   todoStore,
   { name: "todos" },
)

const storeWithDevTools: StateCreator<
   TodoStore,
   [],
   [["zustand/devtools", TodoStore], ["zustand/persist", TodoStore]]
> = devtools(persistedStore)

export const useTodoStore = create<
   TodoStore,
   [["zustand/devtools", TodoStore], ["zustand/persist", TodoStore]]
>(storeWithDevTools)
