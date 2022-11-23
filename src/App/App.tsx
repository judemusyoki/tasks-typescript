import React from 'react'

import { Footer } from '../Footer'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Home from './Home'
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { withTheme } from '../Theme/Theme'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(2), // Material UI spacing
    },
    position: 'absolute',
    overflow: 'auto',
    backgroundColor: theme.palette.background.paper, // Makes it the same color as the paper color
    backgroundImage: `url(${'https://www.transparenttextures.com/patterns/cubes.png'})`,
  },
}))

const App = (props: { darkMode: any; setDarkMode: any }) => {
  const classes = useStyles()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('xs')) // Anything size xs we return matches
  // eslint-disable-next-line react/prop-types
  const { darkMode, setDarkMode } = props

  return (
    <Grid
      className={classes.root}
      container
      justifyContent="center"
      alignItems={matches ? 'flex-start' : 'center'}
    >
      <Grid item>
        <Paper elevation={8}>
          <Home />
        </Paper>
        <FormControlLabel
          control={
            <Switch
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
          }
          label="Dark Mode"
        />
        <Footer />
      </Grid>
    </Grid>
  )
}

export default withTheme(App)
