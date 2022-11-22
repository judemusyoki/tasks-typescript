import React, { useState } from 'react';

import { useTodos } from '../store/store';

import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Typography } from '@material-ui/core';
import {TodoInput} from './TodoInput';

const useStyles = makeStyles((theme) => ({
  todoItemContainer: {
    borderRadius: 5
  },
  todoItem: {
    width: '100%',
    minHeight: 200
  }
}));

export const TodoDisplay = ({currentTodo}) => {
  const classes = useStyles();
  const [toggleForm, setToggleForm] = useState(false);
  const {selectTodo, removeTodo} = useTodos();

  const handleClick = () => {
    selectTodo()
  }

  const handleEdit = () => setToggleForm(!toggleForm)

  if(toggleForm) return <TodoInput todo={currentTodo} handleToggle={handleClick} />

  else return (
    <Paper className={classes.todoItemContainer} elevation={8}>

      <IconButton onClick={handleClick}>
        <CloseIcon />
      </IconButton>
      <Box className={classes.todoItem} p={3}>
        <Typography variant='h4'>{currentTodo.title}</Typography>
        <Typography variant='subtitle1'>{currentTodo.subtext}</Typography>
        <Typography m={10} variant='body2'>{currentTodo.notes}</Typography>
      </Box>

      <IconButton onClick={() =>  handleEdit(currentTodo)}>
        <EditIcon />
      </IconButton>
           
      <IconButton onClick={() => removeTodo(currentTodo.id)}>
        <DeleteIcon />
      </IconButton>
      
    </Paper>
    
  )
}
