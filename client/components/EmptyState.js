import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import {connect} from 'react-redux'
import Typography from '@material-ui/core/Typography'

const styles = {
  center: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center'
  }
}

class EmptyState extends Component {
  render() {
    // Styling
    const {classes} = this.props

    // Properties
    const {icon, title, description, button, image, auth} = this.props
    return (
      <div className={classes.center}>
        {image}
        {icon}
        {title && (
          <Typography color="textSecondary" variant="h4">
            {title}
          </Typography>
        )}
        {description && (
          <Typography color="textSecondary" variant="h5">
            {description}
          </Typography>
        )}
        {auth.isEmpty && button}
      </div>
    )
  }
}

EmptyState.propTypes = {
  classes: PropTypes.object.isRequired,
  image: PropTypes.element,
  icon: PropTypes.element,
  title: PropTypes.string,
  description: PropTypes.object,
  button: PropTypes.element
}

const mapState = state => {
  return {
    auth: state.firebase.auth
  }
}

export default withStyles(styles)(connect(mapState)(EmptyState))
