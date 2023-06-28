import React, { useContext, useState } from "react";
import { TodoContext } from "../context/TodoContext";
import { AiOutlinePlus } from "react-icons/ai"


const TodoInput = () => {
  const {handleAddTodo} = useContext(TodoContext);
  const [text, setText] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddTodo(text);
    setText('');
  };

  return (
    <form className="form-input" onSubmit={handleSubmit}>
      <input className="add-task"
        type="text"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <button className="add-task-icon" type="submit"><AiOutlinePlus className="icon-plus"/></button>
    </form>
  );
};

export default TodoInput;
