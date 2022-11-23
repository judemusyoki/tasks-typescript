import React from 'react'

import { withProvider, useTasks } from '../store/store'

import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import { TaskInput } from '../components/Tasks/TaskInput'
import { TaskList } from '../components/Tasks/TaskList'
import { Divider } from '@material-ui/core'
import { TaskDisplay } from '../components/Tasks/TaskDisplay'

const Home = () => {
  const classes = useStyles()
  const { currentTask } = useTasks()

  return (
    <Box className={classes.mainContainer}>
      <Box className={classes.listContainer} p={2}>
        <Grid item>
          <TaskList />
        </Grid>
      </Box>
      <Divider />

      <Box className={classes.noteContainer} p={2}>
        <Grid container direction="column">
          <Grid item>
            {currentTask ? (
              <TaskDisplay currentTask={currentTask} />
            ) : (
              <TaskInput task={currentTask} />
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

// Anything within Tasks component will be able to use withProvider
export default withProvider(Home)

const useStyles = makeStyles(() => ({
  mainContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: 1000,
    minHeight: 600,
  },
  listContainer: {
    width: '50%',
  },
  noteContainer: {
    width: '50%',
  },
}))
