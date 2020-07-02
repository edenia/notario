import React from 'react'
import TextField from '@material-ui/core/TextField'
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box'
import MenuItem from '@material-ui/core/MenuItem'
import Switch from '@material-ui/core/Switch'
import { DropzoneHash } from '@eoscostarica/eoscr-components'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import Modal from '../../components/Modal'

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
  dataForm
}) => (
  <Modal openModal={openCertifyModal} setOpenModal={setOpenCertifyModal}>
    <Box className={classes.certifyContent}>
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
              label="Método"
              helperText={method ? '' : 'Seleccioná el método de certificado'}
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              variant="outlined"
              fullWidth
            >
              {methods.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            {method === 'file' && (
              <DropzoneHash
                useModal={false}
                handleOnDropFile={(resultFile) => setFile(resultFile)}
                customStyle={file ? {} : classes.dropBox}
              />
            )}
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
              onChange={(e) => onHandleSetDataForm(e.target.value, 'title')}
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
              onChange={(e) => onHandleSetDataForm(e.target.value, 'comment')}
              variant="outlined"
              fullWidth
              multiline
            />
            <Typography variant="body1">
              {t('notary.certifyModal.inputCheck')}
              <Switch
                checked={dataForm.useRam}
                onChange={() => onHandleSetDataForm(!dataForm.useRam, 'useRam')}
                name="checkedA"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
            </Typography>
          </>
        )}
      </Box>
      <Box className={classes.contentBtn}>
        {step === 1 && (
          <>
            <Button
              variant="outlined"
              onClick={() => setOpenCertifyModal(false)}
            >
              {t('notary.cancelButton')}
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setStep(2)}
              disabled={!file}
            >
              {t('notary.acceptButton')}
            </Button>
          </>
        )}
        {step === 2 && (
          <>
            <Button
              variant="outlined"
              onClick={() => setOpenCertifyModal(false)}
            >
              {t('notary.cancelButton')}
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setOpenCertifyModal(false)}
              disabled={!dataForm.title}
            >
              {t('notary.acceptButton')}
            </Button>
          </>
        )}
      </Box>
    </Box>
  </Modal>
)

CertifyModal.propTypes = {
  classes: PropTypes.object,
  setOpenCertifyModal: PropTypes.func,
  openCertifyModal: PropTypes.bool,
  setMethod: PropTypes.func,
  methods: PropTypes.array,
  setFile: PropTypes.func,
  file: PropTypes.object,
  onHandleSetDataForm: PropTypes.func,
  t: PropTypes.any,
  step: PropTypes.any,
  setStep: PropTypes.func,
  dataForm: PropTypes.object,
  method: PropTypes.any
}

export default CertifyModal
