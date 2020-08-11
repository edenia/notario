import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box'
import MenuItem from '@material-ui/core/MenuItem'
import Switch from '@material-ui/core/Switch'
import {
  DropzoneHash,
  RicardianContract,
  InputHash
} from '@eoscostarica/eoscr-components'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import ContactSupportIcon from '@material-ui/icons/ContactSupport'
import IconButton from '@material-ui/core/IconButton'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace'

import Modal from '../../components/Modal'
import TransitionAlert from '../../components/TransitionAlert'

const CertifyModal = ({
  classes,
  setOpenCertifyModal,
  openCertifyModal,
  setMethod,
  methods,
  method,
  setFile,
  file,
  onHandleSetDataForm,
  t,
  step,
  setStep,
  dataForm,
  onSaveData,
  loading,
  error,
  setError
}) => {
  const [showRicardianContract, setShowRicardianContract] = useState(false)
  const apiName = process.env.REACT_APP_EOS_API

  const getComponent = (method) => {
    switch (method) {
      case 'file': {
        return (
          <DropzoneHash
            file={file}
            deleteFile={() => setFile(null)}
            handleOnDropFile={(resultFile) => {
              console.log(resultFile)
              setFile(resultFile)
            }}
          />
        )
      }
      case 'text': {
        return (
          <InputHash
            id="input-hash"
            multiline
            rows={4}
            variant="outlined"
            placeholder={t('message')}
            handleOnChange={(hash) => setFile({ filehash: hash })}
            fullWidth
          />
        )
      }

      default:
        break
    }
  }

  return (
    <Modal
      openModal={openCertifyModal}
      setOpenModal={(value) => {
        setShowRicardianContract(false)
        setStep(1)
        setOpenCertifyModal(value)
        setFile(null)
      }}
    >
      <Box className={classes.certifyContent}>
        {showRicardianContract ? (
          <Box mb={5}>
            <Box
              className={classes.linkBox}
              onClick={() => setShowRicardianContract(false)}
            >
              <KeyboardBackspaceIcon />
              <Typography variant="h3">{t('back')}</Typography>
            </Box>
            <RicardianContract
              contractName="notarioeoscr"
              httpEndpoint={apiName}
            />
          </Box>
        ) : (
          <>
            <Box>
              {step === 1 && (
                <>
                  <Typography variant="h3" align="left">
                    {t('notary.certifyModal.title')}
                  </Typography>
                  <Typography variant="body1">
                    {t('notary.certifyModal.paragraph')}
                  </Typography>
                  <TextField
                    id="outlined-select-method"
                    select
                    label={t('notary.certifyModal.selectLabel')}
                    helperText={
                      method ? '' : t('notary.certifyModal.selectLegend')
                    }
                    value={method}
                    onChange={(e) => setMethod(e.target.value)}
                    variant="outlined"
                    fullWidth
                    disabled={error.isError}
                  >
                    {methods.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {t(`notary.verifyIssuance.${option.value}`)}
                      </MenuItem>
                    ))}
                  </TextField>

                  {getComponent(method)}
                </>
              )}
              {step === 2 && (
                <>
                  <Typography variant="h3" align="left">
                    {t('notary.certifyModal.title2')}
                  </Typography>
                  <Typography variant="body1">
                    {t('notary.certifyModal.paragraph2')}
                  </Typography>
                  <TextField
                    id="certify-title-input"
                    label="Titulo"
                    placeholder="Título de su certificado."
                    value={dataForm.title}
                    onChange={(e) =>
                      onHandleSetDataForm(e.target.value, 'title')
                    }
                    variant="outlined"
                    fullWidth
                  />
                  <TextField
                    id="certify-title-input"
                    label="Comentario"
                    placeholder="Escriba un comentario aquí."
                    helperText="Máximo 56 caracteres."
                    value={dataForm.comment}
                    rows={4}
                    onChange={(e) =>
                      onHandleSetDataForm(e.target.value, 'comment')
                    }
                    variant="outlined"
                    fullWidth
                    multiline
                  />
                  <Typography variant="body1">
                    {t('notary.certifyModal.inputCheck')}
                    <Switch
                      checked={dataForm.useRam}
                      onChange={() =>
                        onHandleSetDataForm(!dataForm.useRam, 'useRam')
                      }
                      name="checkedA"
                      inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />
                  </Typography>
                </>
              )}
            </Box>
            <Box>
              <TransitionAlert data={error} setData={setError} />
              {step === 1 && (
                <Box className={classes.contentBtn}>
                  <Box className={classes.seeRicandianContract}>
                    <IconButton
                      aria-label="ricardianContract"
                      onClick={() => setShowRicardianContract(true)}
                    >
                      <ContactSupportIcon />
                      <Typography variant="body1">LEER CONTRATO</Typography>
                    </IconButton>
                  </Box>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setOpenCertifyModal(false)
                      setStep(1)
                      setFile(null)
                    }}
                  >
                    {t('notary.cancelButton')}
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => setStep(2)}
                    disabled={!file || error.isError}
                    className={classes.certifyButton}
                  >
                    {t('notary.sendButton')}
                  </Button>
                </Box>
              )}
              {step === 2 && (
                <Box className={classes.contentBtn}>
                  <Box className={classes.seeRicandianContract}>
                    <IconButton
                      aria-label="ricardianContract"
                      onClick={() => setShowRicardianContract(true)}
                    >
                      <ContactSupportIcon />
                      <Typography variant="body1">LEER CONTRATO</Typography>
                    </IconButton>
                  </Box>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setOpenCertifyModal(false)
                      setStep(1)
                      setFile(null)
                    }}
                    disabled={loading}
                  >
                    {t('notary.cancelButton')}
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => onSaveData()}
                    disabled={!dataForm.title || loading}
                    className={classes.certifyButton}
                  >
                    {loading ? (
                      <CircularProgress size={14} />
                    ) : (
                      t('notary.sendButton')
                    )}
                  </Button>
                </Box>
              )}
              <br />
            </Box>
          </>
        )}
      </Box>
    </Modal>
  )
}

CertifyModal.propTypes = {
  classes: PropTypes.object,
  setOpenCertifyModal: PropTypes.func,
  openCertifyModal: PropTypes.bool,
  setMethod: PropTypes.func,
  methods: PropTypes.array,
  setFile: PropTypes.func,
  file: PropTypes.object,
  onHandleSetDataForm: PropTypes.func,
  onSaveData: PropTypes.func,
  t: PropTypes.any,
  step: PropTypes.any,
  setStep: PropTypes.func,
  dataForm: PropTypes.object,
  method: PropTypes.any,
  error: PropTypes.object,
  setError: PropTypes.func,
  loading: PropTypes.bool
}

export default CertifyModal
