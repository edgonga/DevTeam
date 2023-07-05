import React from "react";
import TodoInput from "../components/TodoInput";
import TodoList from "../components/TodoList";

const Home = () => {
  return (
    <>
        <h4>Add a task name</h4>
        <TodoInput />
      <div className="main-list">
        <TodoList />
      </div>
    </>
  );
};

export default Home;