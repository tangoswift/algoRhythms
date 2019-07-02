import React from 'react'
import Typography from '@material-ui/core/Typography'

export default function RoomResults(props) {
  return (
    <div>
      <Typography component="h2" variant="h5">
        Results: {props.results}
      </Typography>
    </div>
  )
}
