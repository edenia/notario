import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import SearchIcon from '@material-ui/icons/Search'
import AddIcon from '@material-ui/icons/Add'

import VerifyModal from './VerifyModal'
import CertifyModal from './CertifyModal'

const verificationMethods = [
  {
    value: 'rawHash',
    label: 'Entrada de texto'
  },
  {
    value: 'uploadFile',
    label: 'Cargar archivo'
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
  seeRicandianContract: {
    width: '100%',
    margin: '0px !important',
    '& p': {
      fontSize: 14.8,
      lineHeight: 1.08,
      letterSpacing: '1.25px',
      textAlign: 'center',
      marginLeft: theme.spacing(1)
    },
    '& button': {
      margin: '0px !important',
      padding: '5px 0px !important',
      '&:hover': {
        backgroundColor: 'transparent'
      }
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
  },
  certifyButton: {
    minWidth: 95
  },
  linkBox: {
    display: 'flex',
    width: 120,
    marginBottom: theme.spacing(2),
    '& svg': {
      marginRight: theme.spacing(1)
    },
    '&:hover': {
      cursor: 'pointer'
    }
  }
}))

const Notary = ({ ual }) => {
  const { t } = useTranslation('translations')
  const history = useHistory()
  const classes = useStyles()
  const [openCertifyModal, setOpenCertifyModal] = useState(false)
  const [openVerifyModal, setOpenVerifyModal] = useState(false)
  const [loadingQr, setLoadingQr] = useState(false)
  const [loading, setLoading] = useState(false)
  const [inputHashValue, setInputHashValue] = useState({ isValid: false })
  const [method, setMethod] = useState('')
  const [verificationMethod, setVerificationMethod] = useState('')
  const [step, setStep] = useState(1)
  const [file, setFile] = useState(null)
  const [error, setError] = useState({
    isError: false,
    message: null,
    severity: 'warning',
    show: false
  })
  const [dataForm, setDataForm] = useState({
    comment: '',
    useRam: false,
    title: ''
  })

  const onHandleSetDataForm = (value, field) => {
    setDataForm({ ...dataForm, [field]: value })
  }

  const onHandleVerify = () => {
    history.push({
      pathname: '/dashboard/result',
      state: { hash: inputHashValue.hash }
    })
  }

  const onHandleSetFile = async (resultFile) => {
    if (resultFile) {
      const { rows } = await ual.activeUser.rpc.get_table_rows({
        json: true,
        code: 'notarioeoscr',
        scope: 'notarioeoscr',
        table: 'libro',
        limit: 1,
        index_position: 2,
        key_type: 'sha256',
        lower_bound: resultFile.filehash
      })

      if (rows.length && rows[0].hash === resultFile.filehash) {
        setError({
          isError: true,
          message: 'Este Hash ya existe!',
          severity: 'warning',
          show: true
        })
      } else {
        setError({
          isError: false,
          message: null,
          severity: 'warning',
          show: false
        })
      }
    }

    setFile(resultFile)
  }

  const onSaveData = async () => {
    try {
      if (!ual.activeUser) return

      setLoading(true)

      const transaction = {
        actions: [
          {
            account: 'notarioeoscr',
            name: 'anotar',
            authorization: [
              {
                actor: ual.activeUser.accountName,
                permission: 'active'
              }
            ],
            data: {
              comentario: dataForm.comment,
              contenido: file.filehash,
              guardar_en_tabla: dataForm.useRam,
              hash: file.filehash,
              usuario: ual.activeUser.accountName,
              titulo: dataForm.title
            }
          }
        ]
      }

      await ual.activeUser.signTransaction(transaction, {
        broadcast: true
      })

      setLoading(false)
      setOpenCertifyModal(false)
      history.push({
        pathname: '/dashboard/result',
        state: { hash: file.filehash }
      })
    } catch (err) {
      setError({
        isError: true,
        message: err.cause ? err.cause.message : err,
        severity: 'error',
        show: true
      })
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!ual.activeUser) {
      setError({
        isError: true,
        message: 'Es necesario inicar sesión!',
        severity: 'info',
        show: true
      })
    } else {
      setError({
        isError: false,
        message: null,
        severity: 'warning',
        show: false
      })
    }
  }, [ual.activeUser])

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
          methods={verificationMethods}
          verificationMethod={verificationMethod}
          setVerificationMethod={setVerificationMethod}
          openVerifyModal={openVerifyModal}
          setOpenVerifyModal={setOpenVerifyModal}
          setInputHashValue={setInputHashValue}
          inputHashValue={inputHashValue}
          setLoadingQr={setLoadingQr}
          loadingQr={loadingQr}
          t={t}
          error={error}
          setError={setError}
          onHandleVerify={onHandleVerify}
        />

        <CertifyModal
          classes={classes}
          setOpenCertifyModal={setOpenCertifyModal}
          openCertifyModal={openCertifyModal}
          setMethod={setMethod}
          methods={verificationMethods}
          setFile={onHandleSetFile}
          file={file}
          onHandleSetDataForm={onHandleSetDataForm}
          onSaveData={onSaveData}
          setLoadingQr={setLoadingQr}
          t={t}
          step={step}
          setStep={setStep}
          dataForm={dataForm}
          method={method}
          loading={loading}
          error={error}
          setError={setError}
        />
      </Grid>
    </Grid>
  )
}

Notary.propTypes = {
  ual: PropTypes.object
}

Notary.defaultProps = {
  ual: {}
}

export default Notary
