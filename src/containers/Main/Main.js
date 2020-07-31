import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { makeStyles, useTheme } from '@material-ui/styles'
import AppBar from '@material-ui/core/AppBar'
import Container from '@material-ui/core/Container'
import Drawer from '@material-ui/core/Drawer'
import Box from '@material-ui/core/Box'
import Toolbar from '@material-ui/core/Toolbar'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(11),
    display: 'flex',
    [theme.breakpoints.up('lg')]: {
      paddingRight: theme.spacing(32),
      paddingLeft: theme.spacing(32)
    }
  },
  appBar: {
    boxShadow: 'none',
    '& a': {
      textDecoration: 'none'
    },
    '& h3': {
      color: theme.palette.white,
      fontSize: 21.1,
      fontWeight: 'bold',
      letterSpacing: 0.25
    }
  },
  logo: {
    height: 36
  },
  drawer: {
    width: 0,
    transition: 'width 225ms cubic-bezier(0, 0, 0.2, 1) 0ms'
  },
  drawerDesktop: {
    width: 240
  },
  drawerPaper: {
    width: 240,
    [theme.breakpoints.up('md')]: {
      marginTop: 64
    }
  },
  drawerToggle: {
    marginLeft: -12
  },
  drawerContent: {
    backgroundColor: theme.palette.white,
    height: '100%',
    padding: theme.spacing(2)
  },
  linkBox: {
    color: theme.palette.white,
    display: 'flex',
    '& svg': {
      marginRight: theme.spacing(1)
    }
  }
}))

const Main = ({ children, sidebarContent, topbarContent }) => {
  const { t } = useTranslation('translations')
  const classes = useStyles()
  const theme = useTheme()
  const location = useLocation()
  const isResultPage = location.pathname === '/dashboard/result'
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true
  })

  const [openSidebar, setOpenSidebar] = useState(false)

  return (
    <Container component="main" maxWidth="xl" className={classes.root}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <RouterLink to="/">
            {isResultPage ? (
              <Box className={classes.linkBox}>
                <KeyboardBackspaceIcon />
                <Typography variant="h3">{t('resultPage')}</Typography>
              </Box>
            ) : (
              <Typography variant="h3">{t('mainTitle')}</Typography>
            )}
          </RouterLink>
          {topbarContent}
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        classes={{ paper: classes.drawerPaper }}
        onClose={() => setOpenSidebar(false)}
        open={openSidebar}
        variant={isDesktop ? 'persistent' : 'temporary'}
        className={clsx({
          [classes.drawer]: true,
          [classes.drawerDesktop]: isDesktop && openSidebar
        })}
      >
        <div className={classes.drawerContent}>{sidebarContent}</div>
      </Drawer>
      {children}
    </Container>
  )
}

Main.propTypes = {
  children: PropTypes.node,
  sidebarContent: PropTypes.node,
  topbarContent: PropTypes.node
}

export default Main
