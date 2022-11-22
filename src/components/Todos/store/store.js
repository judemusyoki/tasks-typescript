import React, { useContext, createContext } from 'react';
import useLocalStorage from '../../../hooks/useLocalStorage';
import { v4 } from 'uuid'

const Context = createContext(
  // Default context
  {
    todos: [],
  }
);

const Provider = (props) => {
  // children are all the child components in this component
  const { children } = props;
  const [todos, setTodos] = useLocalStorage('todos', [
    {
      id: v4(),
      text: 'feed the dog',
      completed: false,
    },
    {
      id: v4(),
      text: 'go shopping',
      completed: false,
    },
    {
      id: v4(),
      text: 'read the book',
      completed: false,
    },
  ]);

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
    <Context.Provider value={{ todos, addTodo, editTodo, removeTodo, toggleTodo }}>
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
