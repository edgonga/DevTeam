import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/">
            <TodoInput />
            <div className="main-list">
              <TodoList />
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
