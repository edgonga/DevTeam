import React, { useContext, useRef, useEffect } from "react";
import { TodoContext } from "../context/TodoContext";
import { ImBin2 } from "react-icons/im";

const TodoItem = ({ todo }) => {
  const itemRef = useRef(null);

  useEffect(() => {
    // Add the active class after the component is mounted
    if (itemRef.current) {
      itemRef.current.classList.add("todo-item-enter-active");
    }
  }, []);

  const { handleTodoDelete } = useContext(TodoContext);

  return (
    <li ref={itemRef} className="todo-item-enter">
      {todo.text}
      <ImBin2
        className="bin"
        onClick={() => {
          handleTodoDelete(todo.id);
        }}
      />
    </li>
  );
};

export default TodoItem;
