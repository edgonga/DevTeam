import React from "react";
import TodoInput from "../components/TodoInput";
import TodoList from "../components/TodoList";

const Home = () => {
  return (
    <>
      <TodoInput />
      <div className="main-list">
        <TodoList />
      </div>
    </>
  );
};

export default Home;