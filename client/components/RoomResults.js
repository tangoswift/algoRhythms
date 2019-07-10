import React from 'react'
import Typography from '@material-ui/core/Typography'
import green from '@material-ui/core/colors/green'
import {createMuiTheme} from '@material-ui/core/styles'
import {ThemeProvider} from '@material-ui/styles'

const innerTheme = createMuiTheme({
  palette: {
    primary: green
  }
})

export default function RoomResults(props) {
  return (
    <ThemeProvider theme={innerTheme}>
      <ul>
        {props.result.length
          ? props.result.map((result, idx) => {
              return (
                <li key={idx}>
                  {result.includes('fail') ? (
                    <Typography color="error">{result}</Typography>
                  ) : (
                    <Typography color="primary">{result}</Typography>
                  )}
                </li>
              )
            })
          : 'Waiting'}
      </ul>
    </ThemeProvider>
  )
}
