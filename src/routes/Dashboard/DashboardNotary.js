import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { useTranslation } from 'react-i18next'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import SearchIcon from '@material-ui/icons/Search'
import AddIcon from '@material-ui/icons/Add'

import VerifyModal from './VerifyModal'
import CertifyModal from './CertifyModal'

const methods = [
  {
    value: 'file',
    label: 'Archivo'
  }
]

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
  contentBtn: {
    display: 'flex',
    justifyContent: 'flex-end',
    '& button': {
      marginLeft: theme.spacing(1)
    },
    '& div': {
      marginLeft: theme.spacing(1),
      flexGrow: '0 !important'
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
  },
  certifyContent: {
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
  dropBox: {
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.up('sm')]: {
      height: '95%'
    }
  }
}))

const Notary = () => {
  const { t } = useTranslation('translations')
  const classes = useStyles()
  const [openCertifyModal, setOpenCertifyModal] = useState(false)
  const [openVerifyModal, setOpenVerifyModal] = useState(false)
  const [loadingQr, setLoadingQr] = useState(false)
  const [inputHashValue, setInputHashValue] = useState({ isValid: false })
  const [method, setMethod] = useState('')
  const [step, setStep] = useState(1)
  const [file, setFile] = useState(null)
  const [dataForm, setDataForm] = useState({
    comment: '',
    useRam: false,
    title: ''
  })

  const onHandleSetDataForm = (value, field) => {
    setDataForm({ ...dataForm, [field]: value })
  }

  return (
    <Grid item xs={12} className={classes.wrapper}>
      <Typography variant="body1">{t('notary.text1')}</Typography>
      <Typography variant="body1">{t('notary.text2')}</Typography>
      <Grid className={classes.btnBox}>
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

        <VerifyModal
          classes={classes}
          openVerifyModal={openVerifyModal}
          setOpenVerifyModal={setOpenVerifyModal}
          setInputHashValue={setInputHashValue}
          inputHashValue={inputHashValue}
          setLoadingQr={setLoadingQr}
          loadingQr={loadingQr}
          t={t}
        />

        <CertifyModal
          classes={classes}
          setOpenCertifyModal={setOpenCertifyModal}
          openCertifyModal={openCertifyModal}
          setMethod={setMethod}
          methods={methods}
          setFile={setFile}
          file={file}
          onHandleSetDataForm={onHandleSetDataForm}
          setLoadingQr={setLoadingQr}
          t={t}
          step={step}
          setStep={setStep}
          dataForm={dataForm}
          method={method}
        />
      </Grid>
    </Grid>
  )
}

export default Notary
