import React, {Component} from 'react'
import ProblemsSolved from './ProblemsSolved'
import {getRoomHistoryThunk} from '../store/user'
import {connect} from 'react-redux'
import Loading from './Loading'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import {withStyles} from '@material-ui/core/styles'
import Chip from '@material-ui/core/Chip'
import FaceIcon from '@material-ui/icons/Face'
import DoneIcon from '@material-ui/icons/Done'
import Badge from '@material-ui/core/Badge'
import Avatar from '@material-ui/core/Avatar'

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 3,
    border: 0,
    padding: '0 30px',
    height: '48px',
    boxShadow: '0 3px 5px 2px rgba(25, 15, 15, .3)',
    marginTop: '10px'
  },
  badges: {
    margin: theme.spacing(2)
  },
  padding: {
    padding: theme.spacing(0, 1.2)
  }
})

export class UserProfile extends Component {
  componentDidMount() {
    this.props.getRooms(this.props.userId)
  }

  render() {
    const {roomHistory, classes, profile} = this.props
    const totalPoints = roomHistory
      ? roomHistory
          .filter(room => room.solved)
          .reduce((accum, curVal) => accum + curVal.points, 0)
      : 0
    const totalProblemsSolved = roomHistory
      ? roomHistory.filter(room => room.solved).length
      : 0

    if (!profile || !roomHistory) {
      return <Loading />
    } else {
      return (
        <Container>
          <div className={classes.root}>
            <Avatar>
              {profile.firstName[0]}
              {profile.lastName[0]}
            </Avatar>

            <div>
              <Badge
                className={classes.badges}
                badgeContent={totalProblemsSolved}
                color="secondary"
              >
                <Typography className={classes.padding}>Solved</Typography>
              </Badge>
              <Badge
                className={classes.badges}
                badgeContent={totalPoints}
                color="secondary"
              >
                <Typography className={classes.padding}>
                  Total Points
                </Typography>
              </Badge>
            </div>
            {/* <Chip
              className="stats-name"
              variant="contained"
              color="secondary"
              label={`${profile.firstName} ${
                profile.lastName
              } : Problems History`}
            />
            <div>
              <Chip
                variant="outlined"
                color="secondary"
                deleteIcon={<DoneIcon />}
                icon={<FaceIcon />}
                label={`Problems Solved : ${totalProblemsSolved}`}
              />{' '}
              <Chip
                variant="outlined"
                color="secondary"
                icon={<FaceIcon />}
                label={`Total Points = ${totalPoints}`}
              />
            </div> */}
          </div>
          {roomHistory.length === 0 ? (
            //Displays when user has no problems history
            <Typography>0 Problems Solved</Typography>
          ) : (
            //Displays the room history
            <ProblemsSolved roomHistory={this.props.roomHistory} />
          )}
        </Container>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    roomHistory: state.user.roomHistory,
    userId: state.firebase.auth.uid,
    profile: state.firebase.profile
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getRooms: userId => dispatch(getRoomHistoryThunk(userId))
  }
}

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(UserProfile)
)

/* eslint-disable no-script-url */
