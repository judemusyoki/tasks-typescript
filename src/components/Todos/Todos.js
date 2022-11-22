import React from 'react';

import { withProvider, useTodos } from './store/store';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import {TodoInput} from './components/TodoInput';
import {TodoList} from './components/TodoList';
import { Divider } from '@material-ui/core';
import {TodoDisplay} from './components/TodoDisplay';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: 1000,
    minHeight: 600,
  },
  listContainer: {
    width: '50%'
  },
  noteContainer: {
   width: '50%'
  }
}));

const Todos = () => {
  const classes = useStyles();
  const { currentTodo} = useTodos();

  return (
    <Box className={classes.mainContainer}>
      <Box className={classes.listContainer} p={2}>
        <Grid item>
          <TodoList />
        </Grid>
       
      </Box>
      <Divider />

      <Box className={classes.noteContainer} p={2}>
        <Grid container direction='column'>
          <Grid item>
            {currentTodo ? (
              <TodoDisplay currentTodo={currentTodo} />
            )
            : (
              <TodoInput todo={currentTodo} />
            )  
            } 
          </Grid>
        </Grid>
      </Box>
    </Box>

    
  );
};

// Anything within Todos component will be able to use withProvider
export default withProvider(Todos);
