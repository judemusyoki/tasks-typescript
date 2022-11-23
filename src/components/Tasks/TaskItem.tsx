import React, { FC } from 'react'

import { useTasks } from '../../store/store'

import { makeStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'
import { ListItemIcon } from '@material-ui/core'
import FlagIcon from '@material-ui/icons/Flag'
import { Task, Priority } from '../../types'

const { HIGH, LOW } = Priority

type TaskItemProps = {
  task: Task
}

export const TaskItem: FC<TaskItemProps> = ({ task }) => {
  const classes = useStyles()

  const { toggleTask, selectTask } = useTasks()
  const flagColor = task.priority === HIGH ? 'error' : 'disabled'

  return (
    <ListItem key={task.id} className={classes.listItem}>
      <ListItemIcon>
        <Checkbox
          edge="end"
          checked={task.completed}
          onClick={() => toggleTask(task.id)}
        />
      </ListItemIcon>

      <ListItemText primary={task.title} onClick={() => selectTask(task.id)} />

      <ListItemSecondaryAction>
        {task.priority !== LOW && (
          <ListItemIcon>
            <FlagIcon color={flagColor} />
          </ListItemIcon>
        )}
      </ListItemSecondaryAction>
    </ListItem>
  )
}

const useStyles = makeStyles(() => ({
  listItem: {
    padding: 0,
    '&:hover': {
      backgroundColor: '#D6DDEB',
    },
  },
}))
