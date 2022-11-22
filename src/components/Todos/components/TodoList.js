import React, { useState, useMemo } from 'react';

import { useTodos } from '../store/store';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { TodoItem } from './TodoItem'

const TodoList = ({ handleEdit }) => {
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
  

  return (
    <>
      <List>
        {filteredTodos.map((todo) => {
          return (
            <TodoItem key={todo.id} todo={todo} />
          );
        })}
      </List>
      <Box p={1} component='span'>
        <Button
          variant='contained'
          color='secondary'
          onClick={() => setFilter('all')}
        >
          All
        </Button>
      </Box>
      <Box p={1} component='span'>
        <Button
          variant='contained'
          color='secondary'
          onClick={() => setFilter('completed')}
        >
          Completed
        </Button>
      </Box>
      <Box p={1} component='span'>
        <Button
          variant='contained'
          color='secondary'
          onClick={() => setFilter('not_completed')}
        >
          Due
        </Button>
      </Box>
    </>
  );
};

export default TodoList;
