import React, { useState, useMemo } from 'react';

import { useTodos } from '../store/store';

import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import TodoInput from './TodoInput';

export const TodoItem = ({ todo }) => {
  const [filter, setFilter] = useState('all');
  const [toggleForm, setToggleForm] = useState(false);
  const { todos, toggleTodo, removeTodo } = useTodos();

  const handleClick = () => setToggleForm(!toggleForm)

  if(toggleForm) return <TodoInput todo={todo} handleToggle={handleClick} />

  else return (
    <>
      <ListItem key={todo.id}>
        <ListItemText primary={todo.text} />
        <ListItemSecondaryAction>
          <Checkbox
            checked={todo.completed}
            onClick={() => toggleTodo(todo.id)}
          />
          <IconButton onClick={() =>  handleClick(todo)}>
            <EditIcon />
          </IconButton>
           
          <IconButton onClick={() => removeTodo(todo.id)}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      
    </>
  );
};

export default TodoItem;
