import React, { useState, useMemo, FC } from 'react'

import { useTasks } from '../../store/store'

import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import Box from '@material-ui/core/Box'
import { TaskItem } from './TaskItem'
import { TaskFilters } from './TaskFilters'
import { Task, Filter } from '../../types'
import { Typography } from '@material-ui/core'

const { ALL, COMPLETED, NOT_COMPLETED } = Filter

export const TaskList: FC = (): JSX.Element => {
  const classes = useStyles()

  const [filter, setFilter] = useState(ALL)
  const { tasks } = useTasks()

  const filteredTasks: Task[] | undefined = useMemo(() => {
    if (tasks) {
      switch (filter) {
        case ALL:
          return tasks
        case COMPLETED:
          return tasks.filter((task: Task) => task.completed)
        case NOT_COMPLETED:
          return tasks.filter((task: Task) => !task.completed)
      }
    }
  }, [tasks, filter])

  const handleFilter = (selection: Filter) => {
    setFilter(selection)
  }

  return (
    <Box className={classes.listContainer}>
      <Typography variant={'h5'}>Your Tasks</Typography>
      <TaskFilters handleFilter={handleFilter} />
      <List>
        {filteredTasks?.map((task: Task) => {
          return <TaskItem key={task.id} task={task} />
        })}
      </List>
    </Box>
  )
}

const useStyles = makeStyles(() => ({
  listContainer: {
    width: '100%',
  },
}))
