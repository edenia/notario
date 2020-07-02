import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { useTranslation } from 'react-i18next'
import Box from '@material-ui/core/Box'
import QRCode from 'qrcode.react'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import GetAppIcon from '@material-ui/icons/GetApp'

const useStyles = makeStyles((theme) => ({
  resultContent: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    '& h1': {
      fontSize: 21,
      fontWeight: 'bold',
      letterSpacing: '0.25px',
      color: theme.palette.secondary.contrastText
    },
    '& strong': {
      fontSize: 15.8,
      fontWeight: 'bold',
      letterSpacing: '0.5px',
      color: theme.palette.secondary.contrastText
    },
    '& p': {
      fontSize: 15.8,
      lineHeight: 1.52,
      letterSpacing: '0.15px',
      color: theme.palette.secondary.onSecondaryMediumEmphasizedText,
      overflowWrap: 'break-word',
      marginBottom: theme.spacing(1)
    },
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row'
    }
  },
  resultContentRight: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      width: '40%',
      '& p': {
        fontSize: 12
      }
    }
  },
  resultContentLeft: {
    marginBottom: theme.spacing(4),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '60%'
    }
  },
  hashContent: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(3),
    '& h3': {
      fontSize: 15.8,
      fontWeight: 'bold',
      letterSpacing: '0.5px',
      color: theme.palette.secondary.contrastText
    }
  },
  qrMessage: {
    width: 201,
    fontSize: 13.7,
    fontWeight: '600',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.75,
    letterSpacing: '0.1px',
    marginTop: theme.spacing(2)
  },
  idInfo: {
    marginTop: theme.spacing(3)
  },
  btnDownloadPDF: {
    width: '100%',
    margin: theme.spacing(2, 0),
    [theme.breakpoints.up('sm')]: {
      width: 300
    }
  }
}))

const Result = () => {
  const { t } = useTranslation('translations')
  const classes = useStyles()

  const dataMock = {
    hash: 'dd37a1fa082fe28531047a08f4e6dbd71336dad15515ff178f1b180e77629e25',
    FechaHora: '10 de Abril del 2020, 12:34:04 PM (+6)',
    CuentaEscritora: 'cuenta12letr',
    Título: 'Documento de Certificación 01',
    Comentario:
      'Este es un documento destinado a certificar una serie de datos de importancia.',
    id: '6431752561a561ffb957aa0c0a892f11a167cb8acbafe86a584cb1512cd9b789'
  }

  return (
    <Box width="100%">
      <Box className={classes.resultContent}>
        <Box className={classes.resultContentLeft}>
          <Typography variant="h1">{t('result.title')}</Typography>
          <Box className={classes.hashContent}>
            <Typography variant="h3" align="left">
              {t('result.hashTitle')}:
            </Typography>
            <Typography variant="body1">{dataMock.hash}</Typography>
          </Box>

          <Typography variant="body1">
            <strong>{`${t('result.date')}: `}</strong>
            {dataMock.FechaHora}
          </Typography>

          <Typography variant="body1">
            <strong>{`${t('result.account')}: `}</strong>
            {dataMock.CuentaEscritora}
          </Typography>

          <Typography variant="body1">
            <strong>{`${t('result.titleInfo')}: `}</strong>
            {dataMock.Título}
          </Typography>

          <Typography variant="body1">
            <strong>{`${t('result.comment')}: `}</strong>
            {dataMock.Comentario}
          </Typography>

          <Typography variant="body1" className={classes.idInfo}>
            <strong>{`${t('result.idInfo')}: `}</strong>
            {dataMock.id}
          </Typography>
        </Box>
        <Box className={classes.resultContentRight}>
          <QRCode value={dataMock.hash || 'n/a'} size={200} />
          <Typography
            variant="body1"
            className={classes.qrMessage}
            align="center"
          >
            {t('result.qrMessage')}
          </Typography>
        </Box>
      </Box>
      <Box>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<GetAppIcon />}
          onClick={() => {}}
          className={classes.btnDownloadPDF}
        >
          {t('result.donwloadButton')}
        </Button>
      </Box>
    </Box>
  )
}

export default Result
