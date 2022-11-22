import React from 'react';

import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

const Filters = ({handleFilter}) => {

  return (
  <>
  <Box p={1} component='span'>
        <Button
          variant='contained'
          color='secondary'
          onClick={() => handleFilter('all')}
        >
          All
        </Button>
      </Box>
      <Box p={1} component='span'>
        <Button
          variant='contained'
          color='secondary'
          onClick={() => handleFilter('completed')}
        >
          Completed
        </Button>
      </Box>
      <Box p={1} component='span'>
        <Button
          variant='contained'
          color='secondary'
          onClick={() => handleFilter('not_completed')}
        >
          Due
        </Button>
      </Box>
  </>
    
  )
}

export default Filters;