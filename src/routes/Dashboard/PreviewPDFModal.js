import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import GetAppIcon from '@material-ui/icons/GetApp'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

import Modal from '../../components/Modal'

const useStyles = makeStyles((theme) => ({
  a4Page: {
    padding: 0,
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(0, 6)
    }
  },
  btnDownloadPDF: {
    width: '100%',
    margin: theme.spacing(2, 0),
    [theme.breakpoints.up('sm')]: {
      width: 300
    }
  }
}))

const PreviewPDFModal = ({ open, setOpen, componentToPrint, titulo }) => {
  const classes = useStyles()
  const { t } = useTranslation('translations')

  const handlePrintAsPdf = () => {
    const filename = `${titulo.length ? titulo : 'sinTitulo'}.pdf`

    html2canvas(document.querySelector('#printAsPDF')).then((canvas) => {
      const pdf = new jsPDF('p', 'mm', 'a4')
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 211, 298)
      pdf.save(filename)
    })
  }

  return (
    <Modal openModal={open} setOpenModal={setOpen}>
      <Box className={classes.a4Page} id="printAsPDF">
        {componentToPrint}
      </Box>
      <Button
        variant="contained"
        color="secondary"
        startIcon={<GetAppIcon />}
        onClick={() => handlePrintAsPdf()}
        className={classes.btnDownloadPDF}
      >
        {t('result.downloadButton')}
      </Button>
    </Modal>
  )
}

PreviewPDFModal.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  componentToPrint: PropTypes.func,
  titulo: PropTypes.string
}

export default PreviewPDFModal
