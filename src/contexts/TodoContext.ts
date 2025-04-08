import { createContext, useContext } from "react";
import { Todo } from "../types";

type TodoContext = {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  updateTodo: (todoId: string, todoMessage: string) => void;
  removeTodo: (todoId: string) => void;
  toggleTodo: (todoId: string) => void;
};

export const TodoContext = createContext<TodoContext>({
  todos: [],
  addTodo: () => {},
  updateTodo: () => {},
  removeTodo: () => {},
  toggleTodo: () => {},
});

export const useTodo = () => {
  return useContext(TodoContext);
};
