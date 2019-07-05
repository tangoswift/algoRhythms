import React, {Component} from 'react'
import history from '../history'
import Button from '@material-ui/core/Button'

export const JoinSpecificRoom = props => {
  const {handleListItemClick} = props

  return (
    <form onSubmit={e => handleListItemClick(e, e.target.roomId.value)}>
      <input name="roomId" type="text" />
      <Button type="submit">Submit a room Id or Join below</Button>
    </form>
  )
}
