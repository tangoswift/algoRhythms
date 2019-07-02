import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#212121',
      light: '#484848',
      dark: '000000'
    },
    secondary: {
      main: '#212121',
      light: '#484848',
      dark: '000000'
    }
  }
})

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <Navbar />
      <Routes />
    </MuiThemeProvider>
  )
}

export default App
