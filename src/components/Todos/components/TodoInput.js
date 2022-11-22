import React, { useState, useEffect } from 'react';

import { useTodos } from '../store/store';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { v4 } from 'uuid'

const useStyles = makeStyles((theme) => ({
  textField: {
    width: 400,
    [theme.breakpoints.down('xs')]: {
      width: 200,
    },
  },
}));

export const TodoInput = ({ todo, handleToggle }) => {
  const classes = useStyles();

  const newTodo = {
    id: null,
    title: '',
    subtext: '',
    notes: '',
    completed: false,
    priority: null,
  }

  const { addTodo, editTodo } = useTodos();
  const [currentTodo, setCurrentTodo] = useState({
    ...newTodo,
    id: v4()
  });

  useEffect(() => {
    if(todo) {
      setCurrentTodo(todo)
    }
   
   }, [todo])

  const handleClick = () => {
   if(todo) {
    editTodo(currentTodo);
    setCurrentTodo(newTodo);
    handleToggle()
   } 
   else {
    addTodo(currentTodo);
    setCurrentTodo(newTodo);
   }
  };

  const handleChange = (event) => {
    const { value, name } = event.target
    setCurrentTodo({ 
      ...currentTodo, [name]: value})
  }
  

  return (
    <Grid container>

      <Box m={1}>
        <TextField
          className={classes.textField}
          label='What is your task?'
          size='small'
          variant='outlined'
          name='title'
          value={currentTodo.title}
          onChange={(e) => handleChange(e)}
        />
      </Box>

      <Box m={1}>
        <TextField
          className={classes.textField}
          label='A little subtext never goes too far...'
          size='small'
          variant='outlined'
          name='subtext'
          value={currentTodo.subtext}
          onChange={(e) => handleChange(e)}
        />
      </Box>

      <Box m={1}>
        <TextareaAutosize
          className={classes.textField}
          label='Feel free to share more details about the task'
          placeholder='Feel free to share more details about the task'
          size='small'
          variant='outlined'
          name='notes'
          value={currentTodo.notes}
          onChange={(e) => handleChange(e)}
          minRows={9}
        />
      </Box>

      <Grid item>
        <Box pl={1}>
          <Button
            disabled={currentTodo.title.length === 0}
            variant='contained'
            color='primary'
            onClick={handleClick}
          >
            {todo ? 'Update Todo' : 'Add Todo' }
            
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};
