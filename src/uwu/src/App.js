import './App.css';
import React from 'react';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';

function App() {

  return (
    <div className="App">
      <TodoInput/>
      <div className='main-list'><TodoList/></div>    
    </div>
  );
}

export default App;
