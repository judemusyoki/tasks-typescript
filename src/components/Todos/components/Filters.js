import React from 'react';

import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

export const Filters = ({handleFilter}) => {

  const handleSelection = (selection) => {
    handleFilter(selection)
  }

  return (
  <>
  <Box p={1} component='span'>
        <Button
          variant='contained'
          color='secondary'
          onClick={() => handleSelection('all')}
        >
          All
        </Button>
      </Box>
      <Box p={1} component='span'>
        <Button
          variant='contained'
          color='secondary'
          onClick={() => handleSelection('completed')}
        >
          Completed
        </Button>
      </Box>
      <Box p={1} component='span'>
        <Button
          variant='contained'
          color='secondary'
          onClick={() => handleSelection('not_completed')}
        >
          Due
        </Button>
      </Box>
  </>
    
  )
}
