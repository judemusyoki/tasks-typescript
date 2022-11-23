import React, { useState, useEffect, FC } from 'react'

import { useTasks } from '../../store/store'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import { v4 } from 'uuid'
import { Task, Priority } from '../../types'
import { FormControl, Typography } from '@material-ui/core'

const { HIGH, MEDIUM, LOW } = Priority

type TaskInputProps = {
  task: Task
  handleToggle?: () => void
}

export const TaskInput: FC<TaskInputProps> = ({ task, handleToggle }) => {
  const classes = useStyles()

  const newTask: Task = {
    id: '',
    title: '',
    subtitle: '',
    notes: '',
    completed: false,
    priority: '',
  }

  const { addTask, editTask } = useTasks()
  const [currentTask, setCurrentTask] = useState({
    ...newTask,
    id: v4(),
  })

  useEffect(() => {
    if (task) {
      setCurrentTask(task)
    }
  }, [task])

  const handleClick = () => {
    if (task && handleToggle) {
      editTask(currentTask)
      setCurrentTask(newTask)
      handleToggle()
    } else {
      addTask(currentTask)
      setCurrentTask(newTask)
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (event: any) => {
    const { value, name } = event.target

    setCurrentTask({
      ...currentTask,
      [name]: value,
    })
  }

  return (
    <Grid container className={classes.inputContainer}>
      <Typography variant={'h5'}>Create Task</Typography>
      <Box m={1}>
        <TextField
          className={classes.textField}
          label="What is your task?"
          size="small"
          variant="outlined"
          name="title"
          value={currentTask.title}
          onChange={(e) => handleChange(e)}
        />
      </Box>

      <Box m={1}>
        <TextField
          className={classes.textField}
          label="A little subtext never goes too far..."
          size="small"
          variant="outlined"
          name="subtitle"
          value={currentTask.subtitle}
          onChange={(e) => handleChange(e)}
        />
      </Box>

      <Box m={1}>
        <TextareaAutosize
          className={classes.textField}
          placeholder="Feel free to share more details about the task"
          name="notes"
          value={currentTask.notes}
          onChange={(e) => handleChange(e)}
          minRows={9}
        />
      </Box>

      <Box m={1} className={classes.buttonContainer}>
        <FormControl className={classes.select}>
          <InputLabel htmlFor="priority">Priority</InputLabel>
          <Select
            labelId="priority"
            id="priority"
            name="priority"
            value={currentTask.priority}
            onChange={(e) => handleChange(e)}
          >
            <MenuItem value={HIGH}>Highest Priority</MenuItem>
            <MenuItem value={MEDIUM}>Medium Priority</MenuItem>
            <MenuItem value={LOW}>Lowest Priority</MenuItem>
          </Select>
        </FormControl>
        <Button
          disabled={currentTask.title.length === 0}
          variant="contained"
          color="primary"
          onClick={handleClick}
        >
          {task ? 'Update Task' : 'Add Task'}
        </Button>
      </Box>

      <Box pl={1} className={classes.buttonContainer}></Box>
    </Grid>
  )
}

const useStyles = makeStyles((theme) => ({
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  textField: {
    width: 400,
    [theme.breakpoints.down('xs')]: {
      width: 200,
    },
  },
  select: {
    minWidth: 100,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
}))
