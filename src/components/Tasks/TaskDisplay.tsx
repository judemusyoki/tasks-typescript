import React, { FC, useState } from 'react'

import { useTasks } from '../../store/store'

import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import { Typography } from '@material-ui/core'
import { TaskInput } from './TaskInput'
import { Task } from '../../types'

type TaskDisplayProps = {
  currentTask: Task
}

export const TaskDisplay: FC<TaskDisplayProps> = ({ currentTask }) => {
  const classes = useStyles()
  const [toggleForm, setToggleForm] = useState(false)
  const { selectTask, removeTask } = useTasks()

  const handleClick = () => {
    selectTask()
  }

  const handleEdit = () => setToggleForm(!toggleForm)

  if (toggleForm)
    return <TaskInput task={currentTask} handleToggle={handleClick} />
  else
    return (
      <Paper className={classes.taskItemContainer} elevation={8}>
        <IconButton onClick={handleClick}>
          <CloseIcon />
        </IconButton>
        <Box className={classes.taskItem} p={3}>
          <Typography variant="h4">{currentTask.title}</Typography>
          <Typography variant="subtitle1">{currentTask.subtitle}</Typography>
          <Typography variant="body2">{currentTask.notes}</Typography>
        </Box>

        <IconButton onClick={() => handleEdit()}>
          <EditIcon />
        </IconButton>

        <IconButton onClick={() => removeTask(currentTask.id)}>
          <DeleteIcon />
        </IconButton>
      </Paper>
    )
}

const useStyles = makeStyles(() => ({
  taskItemContainer: {
    borderRadius: 5,
  },
  taskItem: {
    width: '100%',
    minHeight: 200,
  },
}))
