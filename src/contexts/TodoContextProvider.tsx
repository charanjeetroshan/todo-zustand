import { PropsWithChildren, useEffect, useState } from "react";
import { TodoContext } from "./TodoContext";
import { Todo } from "../types";

function TodoContextProvider(props: PropsWithChildren) {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos") ?? "{}");
    if (Array.isArray(todos) && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo: Todo) => {
    setTodos((todos) => [...todos, todo]);
  };

  const removeTodo = (todoId: string) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== todoId));
  };

  const updateTodo = (todoId: string, todoMessage: string) => {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === todoId ? { ...todo, todoMessage } : todo
      )
    );
  };

  const toggleTodo = (todoId: string) => {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === todoId ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  return (
    <TodoContext.Provider
      value={{ todos, addTodo, removeTodo, updateTodo, toggleTodo }}
    >
      {props.children}
    </TodoContext.Provider>
  );
}

export default TodoContextProvider;
