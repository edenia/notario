import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { useTranslation } from 'react-i18next'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import SearchIcon from '@material-ui/icons/Search'
import AddIcon from '@material-ui/icons/Add'
import TextField from '@material-ui/core/TextField'
import CameraAltIcon from '@material-ui/icons/CameraAlt'
import QrReader from 'react-qr-scanner'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

import Modal from '../../components/Modal'

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column'
  },
  btnBox: {
    margin: theme.spacing(3, 0),
    '& button': {
      width: '100%',
      marginBottom: theme.spacing(1.5)
    },
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      justifyContent: 'space-between',
      '& button': {
        width: '45%',
        marginBottom: theme.spacing(1.5)
      }
    }
  },
  verifyContent: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    '& h3': {
      fontSize: 21.1,
      fontWeight: 'bold',
      letterSpacing: '0.25px',
      color: theme.palette.secondary.contrastText
    },
    '& p': {
      fontSize: 15.8,
      lineHeight: 1.52,
      letterSpacing: '0.15px',
      color: theme.palette.secondary.onSecondaryMediumEmphasizedText
    },
    '& .MuiTextField-root': {
      margin: theme.spacing(1.5, 0, 1, 0),
      '& p': {
        fontSize: 11,
        lineHeight: 1.35,
        letterSpacing: '0.4px'
      }
    }
  },
  verifyContentBtn: {
    display: 'flex',
    justifyContent: 'flex-end',
    '& button': {
      marginLeft: theme.spacing(1)
    }
  },
  qrBox: {
    height: 300,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      '& video': {
        height: '250px !important'
      }
    }
  },
  closeIcon: {
    display: 'flex',
    justifyContent: 'flex-end',
    '& svg': {
      fontSize: 25,
      color: theme.palette.primary.main
    }
  },
  btnShowQr: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(8),
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(4)
    }
  }
}))

const Products = () => {
  const { t } = useTranslation('translations')
  const classes = useStyles()
  const [openCertifyModal, setOpenCertifyModal] = useState(false)
  const [openVerifyModal, setOpenVerifyModal] = useState(false)
  const [loadingQr, setLoadingQr] = useState(false)
  const [inputHashValue, setInputHashValue] = useState('')

  return (
    <Grid item xs={12} className={classes.wrapper}>
      <Typography variant="body1">{t('notary.text1')}</Typography>
      <Typography variant="body1">{t('notary.text2')}</Typography>
      <Grid xs={12} className={classes.btnBox}>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<AddIcon />}
          onClick={() => setOpenCertifyModal(true)}
        >
          {t('notary.certifyButton')}
        </Button>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<SearchIcon />}
          onClick={() => setOpenVerifyModal(true)}
        >
          {t('notary.verifyButton')}
        </Button>

        <Modal
          openModal={openCertifyModal}
          setOpenModal={setOpenCertifyModal}
        />

        <Modal openModal={openVerifyModal} setOpenModal={setOpenVerifyModal}>
          <Box className={classes.verifyContent}>
            <Box>
              <Typography variant="h3" align="left">
                {t('notary.verifyModal.title')}
              </Typography>
              <Typography variant="body1">
                {t('notary.verifyModal.paragraph')}
              </Typography>
              <TextField
                id="input-hash"
                label="Hash"
                variant="outlined"
                placeholder="Hash del certificado"
                value={inputHashValue}
                onChange={(event) => setInputHashValue(event.target.value)}
                fullWidth
              />
              {!loadingQr && (
                <Box className={classes.btnShowQr}>
                  <Button
                    variant="outlined"
                    startIcon={<CameraAltIcon />}
                    onClick={() => setLoadingQr(true)}
                  >
                    {t('notary.verifyModal.qrButton')}
                  </Button>
                </Box>
              )}
              {loadingQr && (
                <Box className={classes.qrBox}>
                  <Box className={classes.closeIcon}>
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => setLoadingQr(false)}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  </Box>
                  <QrReader
                    delay={100}
                    onError={() => {}}
                    facingMode="rear"
                    style={{
                      height: '100% !important',
                      width: '100%',
                      backgroundColor: '#8080808c'
                    }}
                    onScan={(value) => {
                      if (!value) return

                      setInputHashValue(value)
                      setLoadingQr(false)
                    }}
                  />
                </Box>
              )}
            </Box>
            <Box className={classes.verifyContentBtn}>
              <Button variant="outlined" onClick={() => setLoadingQr(false)}>
                {t('notary.cancelButton')}
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {}}
                disabled={!inputHashValue.length}
              >
                {t('notary.acceptButton')}
              </Button>
            </Box>
          </Box>
        </Modal>
      </Grid>
    </Grid>
  )
}

export default Products
