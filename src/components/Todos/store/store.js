import React, { useContext, useState, createContext } from 'react';
import useLocalStorage from '../../../hooks/useLocalStorage';
import { v4 } from 'uuid'

const Context = createContext(
  // Default context
  {
    todos: [],
  }
);

const Provider = (props) => {
  const [currentTodo, setCurrentTodo] = useState()
  // children are all the child components in this component
  const { children } = props;
  const [todos, setTodos] = useLocalStorage('todos', [
    {
      id: v4(),
      title: 'feed the dog',
      subtext: 'sub feed',
      notes: 'dog stuff to be dealt with',
      completed: false,
      priority: 1
    },
    {
      id: v4(),
      title: 'go shopping',
      subtext: 'shopping stuff',
      notes: 'stuff about shopping is difficult',
      completed: false,
      priority: 2
    },
    {
      id: v4(),
      title: 'read the book',
      subtext: 'library ',
      notes: 'stuff about books is difficult',
      completed: true,
      priority: null
    },
  ]);

  const selectTodo = (id) => {
    const currentTodo = todos.find(todo => todo.id === id)
    if(id) {
      setCurrentTodo(currentTodo)
    }
    else {
      setCurrentTodo(null)
    }
  }

  const addTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  const editTodo = (newTodo) => {
  const newTodos = todos.map(todo => {
    if(todo.id === newTodo.id) {
      return newTodo
    }
    return todo
  })
  setTodos(newTodos)
  }

  const removeTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const toggleTodo = (id) => {
    const foundTodo = todos.find((todo) => todo.id === id);
    if (foundTodo) {
      foundTodo.completed = !foundTodo.completed;
    }

    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return foundTodo;
      }
      return todo;
    });
    setTodos(newTodos);
  };

  return (
    <Context.Provider 
      value={{ 
        todos,
        currentTodo, 
        addTodo, 
        editTodo, 
        selectTodo, 
        removeTodo, 
        toggleTodo 
      }}>
      {children}
    </Context.Provider>
  );
};

export const useTodos = () => useContext(Context);

export const withProvider = (Component) => {
  return (props) => {
    return (
      <Provider>
        <Component {...props} />
      </Provider>
    );
  };
};
