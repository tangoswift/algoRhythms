import React from 'react'
import Typography from '@material-ui/core/Typography'

export default function RoomResults(props) {
  return (
    <ul>
      {props.results.length
        ? props.results.map((result, idx) => {
            return <li key={idx}>{result}</li>
          })
        : 'Waiting'}
    </ul>
  )
}
