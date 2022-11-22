import React, { useState, useEffect } from 'react';

import { useTodos } from '../store/store';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { v4 } from 'uuid'

const useStyles = makeStyles((theme) => ({
  textField: {
    width: 400,
    [theme.breakpoints.down('xs')]: {
      width: 200,
    },
  },
}));

const TodoInput = ({ todo, handleToggle }) => {
  const classes = useStyles();

  const { addTodo, editTodo } = useTodos();
  const [currentToDo, setCurrentToDo] = useState({
    id: v4(),
    text: '',
    completed: false,
  });

  useEffect(() => {
    if(todo) {
      setCurrentToDo(todo)
    }
   
   }, [todo])

  const handleClick = () => {
   if(todo) {
    editTodo(currentToDo);
    setCurrentToDo({
      id: null,
      text: '',
      completed: false,
    });
    handleToggle()
   } 
   else {
    addTodo(currentToDo);
    setCurrentToDo({
      id: null,
      text: '',
      completed: false,
    });
   }
  };

  const handleChange = (event) => {
    const { value } = event.target
    setCurrentToDo({ 
      ...currentToDo, text: value})
  }
  

  return (
    <Grid container>
      <Grid item>
        <TextField
          className={classes.textField}
          label='what do you want to do?'
          size='small'
          variant='outlined'
          value={currentToDo.text}
          onChange={(e) => handleChange(e)}
        />
      </Grid>
      <Grid item>
        <Box pl={1}>
          <Button
            disabled={currentToDo.text.length === 0}
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

export default TodoInput;
