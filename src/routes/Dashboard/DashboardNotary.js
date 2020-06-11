import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { useTranslation } from 'react-i18next'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import SearchIcon from '@material-ui/icons/Search'
import AddIcon from '@material-ui/icons/Add'

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
    }
  }
}))

const Products = () => {
  const { t } = useTranslation('translations')
  const classes = useStyles()

  return (
    <Grid item xs={12} className={classes.wrapper}>
      <Typography variant="body1">{t('notary')}</Typography>
      <Grid xs={12} className={classes.btnBox}>
        <Button variant="contained" color="secondary" startIcon={<AddIcon />}>
          Certificar Datos
        </Button>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<SearchIcon />}
        >
          Validar Certificados
        </Button>
        <Modal initOpen={false} />
      </Grid>
    </Grid>
  )
}

Products.propTypes = {}

export default Products
