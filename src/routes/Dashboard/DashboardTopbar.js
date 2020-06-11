import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import IconButton from '@material-ui/core/IconButton'
import FingerprintIcon from '@material-ui/icons/Fingerprint'
import LogoutIcon from '@material-ui/icons/ExitToApp'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
  sessionText: {
    marginLeft: 5,
    color: theme.palette.primary.contrastText,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'inline'
    }
  },
  link: {
    color: 'white',
    textDecoration: 'none'
  },
  box: {
    display: 'flex',
    justifyContent: 'flex-end',
    flex: 1
  }
}))

const DashboardTopbar = ({ user, onLogout, onLogin }) => {
  const classes = useStyles()

  return (
    <Box className={classes.box}>
      {user && (
        <Box>
          <IconButton color="inherit">
            <AccountCircleIcon />
            <Typography className={classes.sessionText} variant="subtitle1">
              {user.accountName}
            </Typography>
          </IconButton>
          <IconButton color="inherit" onClick={onLogout}>
            <LogoutIcon />
          </IconButton>
        </Box>
      )}
      {!user && (
        <IconButton color="inherit" onClick={onLogin}>
          <FingerprintIcon />
        </IconButton>
      )}
    </Box>
  )
}

DashboardTopbar.propTypes = {
  user: PropTypes.object,
  onLogout: PropTypes.func,
  onLogin: PropTypes.func
}

export default DashboardTopbar
