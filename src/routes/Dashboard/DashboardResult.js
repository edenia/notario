import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box'
import QRCode from 'qrcode.react'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import LinearProgress from '@material-ui/core/LinearProgress'
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf'
import { useLocation } from 'react-router-dom'

import PreviewPDFModal from './PreviewPDFModal'

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
      width: 200
    }
  }
}))

const BodyResult = ({ data }) => {
  const { t } = useTranslation('translations')
  const classes = useStyles()

  return (
    <Box className={classes.resultContent}>
      <Box className={classes.resultContentLeft}>
        <Typography variant="h1">
          {data.titulo || t('result.defaultTitle')}
        </Typography>
        <Box className={classes.hashContent}>
          <Typography variant="h3" align="left">
            {t('result.hashTitle')}:
          </Typography>
          <Typography variant="body1">{data.hash}</Typography>
        </Box>

        <Typography variant="body1">
          <strong>{`${t('result.date')}: `}</strong>
          {data.FechaHora || '- -'}
        </Typography>

        <Typography variant="body1">
          <strong>{`${t('result.account')}: `}</strong>
          {data.usuario}
        </Typography>

        <Typography variant="body1">
          <strong>{`${t('result.titleInfo')}: `}</strong>
          {data.titulo}
        </Typography>

        <Typography variant="body1">
          <strong>{`${t('result.comment')}: `}</strong>
          {data.comentario || '- -'}
        </Typography>

        <Typography variant="body1" className={classes.idInfo}>
          <strong>{`${t('result.idInfo')}: `}</strong>
          {data.txId}
        </Typography>
      </Box>
      <Box className={classes.resultContentRight}>
        <QRCode value={data.hash || 'n/a'} size={200} />
        <Typography
          variant="body1"
          className={classes.qrMessage}
          align="center"
        >
          {t('result.qrMessage')}
        </Typography>
      </Box>
    </Box>
  )
}

const Result = ({ ual }) => {
  const { t } = useTranslation('translations')
  const classes = useStyles()
  const location = useLocation()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const getData = async () => {
      console.log({ ual })
      if (ual.activeUser) {
        setLoading(true)
        const { rows } = await ual.activeUser.rpc.get_table_rows({
          json: true,
          code: 'notarioeoscr',
          scope: 'notarioeoscr',
          table: 'libro',
          limit: 10,
          index_position: 2,
          key_type: 'sha256',
          lower_bound: location.state.hash
        })

        const txId = rows.length ? rows[0].tx : null

        const { traces } = await ual.activeUser.rpc.history_get_transaction(
          txId,
          null
        )
        setData(traces.length ? { ...traces[0].act.data, txId } : null)
        setLoading(false)
      }
    }

    getData()
  }, [ual.activeUser, location.state.hash])

  if (loading)
    return (
      <Box mt={5} width="100%">
        <Typography variant="h5" align="center">
          {(t('result.loadingInformation') || '').toUpperCase()}
        </Typography>
        <LinearProgress color="secondary" />
      </Box>
    )

  return (
    <Box width="100%">
      <BodyResult data={data} />
      <Box>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<PictureAsPdfIcon />}
          onClick={() => setOpen(true)}
          className={classes.btnDownloadPDF}
        >
          {t('result.openModal')}
        </Button>
      </Box>
      <PreviewPDFModal
        open={open}
        setOpen={setOpen}
        titulo={data.titulo}
        componentToPrint={<BodyResult data={data} />}
      />
    </Box>
  )
}

Result.propTypes = {
  ual: PropTypes.object
}

Result.defaultProps = {
  ual: {}
}

BodyResult.propTypes = {
  data: PropTypes.object
}

export default Result
