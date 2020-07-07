import React from 'react'
import CameraAltIcon from '@material-ui/icons/CameraAlt'
import PropTypes from 'prop-types'
import QrReader from 'react-qr-scanner'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import { InputHash } from '@eoscostarica/eoscr-components'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import Modal from '../../components/Modal'
import TransitionAlert from '../../components/TransitionAlert'

const VerifyModal = ({
  classes,
  openVerifyModal,
  setOpenVerifyModal,
  setInputHashValue,
  inputHashValue,
  setLoadingQr,
  loadingQr,
  t,
  setError,
  error,
  onHandleVerify
}) => (
  <Modal openModal={openVerifyModal} setOpenModal={setOpenVerifyModal}>
    <Box className={classes.verifyContent}>
      <Box>
        <Typography variant="h3" align="left">
          {t('notary.verifyModal.title')}
        </Typography>
        <Typography variant="body1">
          {t('notary.verifyModal.paragraph')}
        </Typography>
        <InputHash
          useHashValidator
          id="input-hash"
          label="Hash"
          variant="outlined"
          placeholder="Hash del certificado"
          value={inputHashValue.hash}
          handleOnChange={(result) => setInputHashValue(result)}
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
                height: 300,
                width: '100%',
                backgroundColor: 'grey',
                marginBottom: 24
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
      <Box>
        <TransitionAlert data={error} setData={setError} />
        <Box className={classes.contentBtn}>
          <Button variant="outlined" onClick={() => setOpenVerifyModal(false)}>
            {t('notary.cancelButton')}
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => onHandleVerify()}
            disabled={!inputHashValue.isValid || error.isError}
          >
            {t('notary.acceptButton')}
          </Button>
        </Box>
      </Box>
    </Box>
  </Modal>
)

VerifyModal.propTypes = {
  classes: PropTypes.object,
  openVerifyModal: PropTypes.bool,
  setOpenVerifyModal: PropTypes.func,
  setInputHashValue: PropTypes.func,
  inputHashValue: PropTypes.object,
  setLoadingQr: PropTypes.func,
  loadingQr: PropTypes.bool,
  t: PropTypes.any,
  error: PropTypes.object,
  setError: PropTypes.func,
  onHandleVerify: PropTypes.func
}

export default VerifyModal
