import React, { FC } from 'react'

import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import { Filter } from '../../types'

const { ALL, COMPLETED, NOT_COMPLETED } = Filter

type TaskFiltersProps = {
  handleFilter: (selection: Filter) => void
}

export const TaskFilters: FC<TaskFiltersProps> = ({
  handleFilter,
}): JSX.Element => {
  const handleSelection = (selection: Filter) => {
    handleFilter(selection)
  }

  return (
    <Box marginTop={1}>
      <Box p={1} component="span">
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleSelection(ALL)}
        >
          All
        </Button>
      </Box>
      <Box p={1} component="span">
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleSelection(COMPLETED)}
        >
          Completed
        </Button>
      </Box>
      <Box p={1} component="span">
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleSelection(NOT_COMPLETED)}
        >
          Due
        </Button>
      </Box>
    </Box>
  )
}
