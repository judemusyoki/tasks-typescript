import React, { useState, useMemo } from 'react';

import { useTodos } from '../store/store';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { TodoItem } from './TodoItem'
import { Filters } from './Filters'

const useStyles = makeStyles((theme) => ({
  listContainer: {
    width: '100%'
  },
}));

export const TodoList = ({ handleEdit }) => {
  const classes = useStyles();

  const [filter, setFilter] = useState('all');
  const { todos, toggleTodo, removeTodo } = useTodos();

  const filteredTodos = useMemo(() => {
    if (filter === 'all') {
      return todos;
    } else if (filter === 'completed') {
      return todos.filter((todo) => todo.completed);
    } else if (filter === 'not_completed') {
      return todos.filter((todo) => !todo.completed);
    }
  }, [todos, filter]);

  const handleFilter = (selection) => {
    setFilter(selection)
  }
  

  return (
    <Box className={classes.listContainer}>
      <Filters handleFilter={handleFilter} />
      <List>
        {filteredTodos.map((todo) => {
          return (
            <TodoItem key={todo.id} todo={todo} />
          );
        })}
      </List>
      
    </Box>
  );
};
