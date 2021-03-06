import React, {Component} from 'react'
import {Link as RouterLink} from 'react-router-dom'
import Link from '@material-ui/core/Link'
import {withStyles} from '@material-ui/core/styles'
import CodeIcon from '@material-ui/icons/Code'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
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
        <Card>
          <CardMedia
            src="https://firebasestorage.googleapis.com/v0/b/algorhythms1904.appspot.com/o/danial-ricaros-FCHlYvR5gJI-unsplash_algorhythm_fade.jpg?alt=media&token=88541a39-f74a-4ca1-af53-fda62774837b"
            component="img"
            style={{height: '100vh'}}
          />
        </Card>
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
              of solving coding challenges in pairs...Remotely!
            </p>
          }
          button={
            <Link
              component={RouterLink}
              underline="none"
              color="inherit"
              to="/login"
            >
              <Button
                type="submit"
                color="primary"
                variant="contained"
                className={classes.button}
              >
                Login
              </Button>
            </Link>
          }
        />
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(Homepage)
