import React, { useState } from 'react';

import { withProvider } from './store/store';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';

const Todos = () => {
  const [currentToDo, setCurrentToDo] = useState()

  const handleEdit = (todo) => {
   setCurrentToDo(todo)
  }

  return (
    <Box p={2}>
      <Grid container direction='column'>
        <Grid item>
          <TodoInput todo={currentToDo} />
        </Grid>
        <Grid item>
          <TodoList handleEdit={handleEdit} />
        </Grid>
      </Grid>
    </Box>
  );
};

// Anything within Todos component will be able to use withProvider
export default withProvider(Todos);
