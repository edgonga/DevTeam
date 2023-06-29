import React, { useState, createContext } from "react";

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  
  const [todos, setTodos] = useState([]);

  const handleAddTodo = (text) => {
    setTodos([...todos, { text, id: Date.now() }]);
  };
  const handleTodoDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <TodoContext.Provider value = {{todos, handleAddTodo, handleTodoDelete}}> {children} </TodoContext.Provider>
  );
};
