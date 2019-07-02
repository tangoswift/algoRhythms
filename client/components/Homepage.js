import React, {Component} from 'react'
import {withStyles} from '@material-ui/core/styles'
import Fab from '@material-ui/core/Fab'
import CodeIcon from '@material-ui/icons/Code'

import EmptyState from './EmptyState'

const styles = theme => ({
  emptyStateIcon: {
    fontSize: theme.spacing(12)
  },

  button: {
    marginTop: theme.spacing(1)
  },

  buttonIcon: {
    marginRight: theme.spacing(1)
  }
})

class Homepage extends Component {
  render() {
    const {classes} = this.props

    return (
      <React.Fragment>
        <EmptyState
          icon={<CodeIcon className={classes.emptyStateIcon} color="action" />}
          title="Practice Pair-Programing"
          description={
            <p>
              Learn to get in the{' '}
              <b>
                <i>rhythm</i>
              </b>{' '}
              <br />
              of solving challenges in pairs
            </p>
          }
          button={
            <Fab
              className={classes.button}
              color="secondary"
              rel="noopener noreferrer"
              target="_blank"
              variant="extended"
            >
              Sign Up to Play
            </Fab>
          }
        />
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(Homepage)
