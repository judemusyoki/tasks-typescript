/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { CSSProperties } from 'react'

import useLocalStorage from '../hooks/useLocalStorage'

import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import purple from '@material-ui/core/colors/purple'
import green from '@material-ui/core/colors/green'

export type Color = CSSProperties['color']

const theme = createTheme({
  palette: {
    type: 'light',
    primary: purple,
    secondary: green,
  },
})

const themeDark = createTheme({
  palette: {
    type: 'dark',
    primary: purple,
    secondary: green,
  },
})

const Theme = (props: { children: any; darkMode: any }) => {
  const { children, darkMode } = props
  const defaultTheme = darkMode ? themeDark : theme
  return <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>
}

export const withTheme = (Component: any) => {
  // eslint-disable-next-line react/display-name
  return (props: JSX.IntrinsicAttributes) => {
    const [darkMode, setDarkMode] = useLocalStorage('darkMode', false)
    return (
      <Theme darkMode={darkMode}>
        <Component {...props} darkMode={darkMode} setDarkMode={setDarkMode} />
      </Theme>
    )
  }
}

// background-image: url('https://www.transparenttextures.com/patterns/cubes.png'); */
