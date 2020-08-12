import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import Link from '@material-ui/core/Link'
import Box from '@material-ui/core/Box'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Alert from '@material-ui/lab/Alert'
import PropTypes from 'prop-types'
import Slide from '@material-ui/core/Slide'
import FindInPageIcon from '@material-ui/icons/FindInPage'
import { rpc } from '../../api/eosjs-api'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import styled from '@material-ui/core/styles/styled'
import Paper from '@material-ui/core/Paper'
import { useTranslation } from 'react-i18next'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const StyledDialogContent = styled(DialogContent)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center'
})
const MessagesBox = styled(Paper)({
  borderRadius: '2px',
  border: '0.5px dashed gray',
  padding: '3%'
})

const VerificationDialog = ({ open, handleClose, txData }) => {
  const [verifying, setVerifying] = useState(false)
  const [verificationDetails, setVerificationDetails] = useState()
  const { t } = useTranslation('translations')
  const verifyTransaction = (tx) => {
    setVerifying(true)
    rpc
      .history_get_transaction(tx)
      .then((x) => {
        setVerificationDetails({
          content: t('verificationDialog.vererificationDetailsSuccess'),
          severity: 'success',
          block_num: x.block_num,
          id: x.id,
          query_time: x.query_time_ms,
          contract_account: x.traces[0].act.account
        })
      })
      .catch(() => {
        setVerificationDetails({
          content: t('verificationDialog.vererificationDetailsError'),
          severity: 'error'
        })
      })
      .finally(() => setVerifying(false))
  }

  return (
    <Dialog
      fullWidth={true}
      maxWidth={'md'}
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{t('verificationDialog.transactionDetails')}</DialogTitle>
      <StyledDialogContent>
        <Box display="flex" flexDirection="column" justifyContent="start">
          <Typography>
            <strong>{t('verificationDialog.title')}</strong> {txData.file}
          </Typography>
          <Typography>
            <strong>{t('verificationDialog.user')}</strong> {txData.account}
          </Typography>
          <Typography>
            <strong>{t('verificationDialog.lastModification')}</strong>{' '}
            {txData.lastModified}
          </Typography>
          <Typography>
            <strong>Hash: </strong>
            <span style={{ fontSize: '.8em', maxWidth: '100%' }}>
              {txData.hash}
            </span>
          </Typography>
        </Box>
        <br />
        <Box display="flex" justifyContent="center" flexDirection="row">
          <Button
            onClick={() => verifyTransaction(txData.tx)}
            variant="contained"
            color="primary"
            endIcon={<FindInPageIcon />}
          >
            {verifying
              ? t('verificationDialog.verifying')
              : t('verificationDialog.verify')}
            <>
              {verifying && (
                <CircularProgress style={{ color: 'white' }} size={24} />
              )}
            </>
          </Button>
        </Box>
        <br />
        {verificationDetails && (
          <Alert
            style={{ backgroundColor: 'green', color: 'white' }}
            severity="success"
          >
            {verificationDetails.content}
          </Alert>
        )}
        <br />
        {verificationDetails && verificationDetails.severity === 'success' && (
          <MessagesBox elevation={3}>
            <Typography>
              <strong>{t('registriesTable.blockNum')}:</strong>{' '}
              {verificationDetails.block_num}
            </Typography>
            <Typography>
              <strong>{t('verificationDialog.transactionId')} </strong>{' '}
              {verificationDetails.id}
            </Typography>
            <Typography>
              <strong>{t('verificationDialog.queryTime')} </strong>
              {verificationDetails.query_time} ms
            </Typography>
            <Typography>
              <strong>{t('verificationDialog.contractAccount')} </strong>
              {verificationDetails.contract_account}
            </Typography>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="flex-end"
              alignContent="flex-end"
            >
              <Button variant="outlined" disableElevation>
                <Link
                  href={`https://jungle3.bloks.io/transaction/${verificationDetails.id}`}
                  target="_blank"
                >
                  {t('verificationDialog.viewInExplorer')}
                </Link>
              </Button>
            </Box>
          </MessagesBox>
        )}
        {verificationDetails && verificationDetails.severity === 'error' && (
          <Alert severity="error">{verificationDetails.content}</Alert>
        )}
      </StyledDialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          {t('verificationDialog.close')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

VerificationDialog.propTypes = {
  open: PropTypes.bool,
  handleCose: PropTypes.func,
  txData: PropTypes.object
}

export default VerificationDialog
