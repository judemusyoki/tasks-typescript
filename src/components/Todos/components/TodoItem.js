import React from 'react';

import { useTodos } from '../store/store';

import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import { ListItemIcon } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  listItem: {
    padding: 0
  },
}));

export const TodoItem = ({ todo, handleClick }) => {
  const classes = useStyles();

  const { toggleTodo, selectTodo } = useTodos();

  return (
    <>
      <ListItem key={todo.id} className={classes.listItem}>
        <ListItemIcon>
          <Checkbox
            edge="end"
            checked={todo.completed}
            onClick={() => toggleTodo(todo.id)}
          />
        </ListItemIcon>
        
        <ListItemText primary={todo.title} onClick={()=> selectTodo(todo.id)} />

        <ListItemSecondaryAction>
         
        </ListItemSecondaryAction>
      </ListItem>
      
    </>
  );
};

