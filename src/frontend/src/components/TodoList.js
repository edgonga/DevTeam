import React, { useContext } from "react";
import TodoItem from "./TodoItem";
import { TodoContext } from "../context/TodoContext";

const TodoList = () =>{

    const {todos} = useContext(TodoContext)
    
    return (
        <div className="list"> 
            {todos.map((todo)=>(
                <TodoItem key={todo.id} todo={todo}/>
            ))}
        </div>
    );
}

export default TodoList;
