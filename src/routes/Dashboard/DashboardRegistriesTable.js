import React, { useState, useEffect, useCallback } from 'react'
import { makeStyles } from '@material-ui/styles'
import IconButton from '@material-ui/core/IconButton'
import Box from '@material-ui/core/Box'
import MoreIcon from '@material-ui/icons/More'
import { useTranslation } from 'react-i18next'
import Alert from '@material-ui/lab/Alert'
import MUIDataTable from 'mui-datatables'
import * as m from 'moment-timezone'
import moment from 'moment'

import { rpc } from '../../api/eosjs-api'
import VerificationDialog from '../../components/VerificationDialog'

const useStyles = makeStyles(() => ({
  box: {
    width: '100%'
  }
}))

const RegistriesTable = () => {
  const classes = useStyles()
  const { t } = useTranslation('translations')
  const [resultRows, setResultRows] = useState([])
  const [open, setOpen] = useState(false)
  const [clickedRow, setClickedRow] = useState()
  const [loadEnd, setLoadEnd] = useState(false)

  const columns = ['blockNum', 'file', 'commentary', 'details']
  const timezone = moment.tz.guess()
  m.locale('es')

  const fetchTransactions = useCallback(
    async (indexPosition, lowerbound) => {
      const { rows } = await rpc.get_table_rows({
        json: true,
        code: 'notarioeoscr',
        scope: 'notarioeoscr',
        table: 'libro',
        limit: 10000,
        lower_bound: lowerbound,
        index_position: indexPosition,
        key_type: 'sha256'
      })

      for (let i = 0; i < rows.length; i++) {
        await rpc
          .history_get_transaction(rows[i].tx)
          .then(async (r) => {
            setResultRows((prev) => [
              ...prev,
              {
                block_num: r.block_num,
                block_time: r.block_time,
                file: r.traces[0].act.data.titulo,
                account: r.traces[0].act.data.usuario,
                company: r.traces[0].act.data.comentario,
                hash: r.traces[0].act.data.hash,
                tx: rows[i].tx,
                lastModified: m(`${r.block_time}Z`)
                  .tz(timezone)
                  .format('DD MMMM YYYY, h:mm:ss a z')
              }
            ])
          })
          .catch((e) => console.error(e))
        await new Promise((resolve) => {
          setTimeout(() => {
            resolve()
          }, 900)
        })
      }
      setLoadEnd(true)
    },
    [timezone]
  )

  useEffect(() => {
    fetchTransactions(2, null)
  }, [fetchTransactions])

  const handleClose = () => setOpen(false)

  const handleClickOpen = (row) => {
    setOpen(true)
    setClickedRow(row)
  }

  return (
    <Box className={classes.box}>
      <Alert severity="info">{t('registriesTable.infoMsg')}</Alert>
      <br />
      <MUIDataTable
        data={resultRows.map((e) => [
          e.block_num,
          e.file,
          e.company,
          <IconButton
            key={e.block_num}
            onClick={() => handleClickOpen(e)}
            aria-label="delete"
            size="medium"
          >
            <MoreIcon fontSize="inherit" />
          </IconButton>
        ])}
        columns={columns.map((e) => t(`registriesTable.${e}`))}
        options={{
          filter: true,
          selectableRowsHeader: false,
          selectableRowsHideCheckboxes: true,
          print: false,
          count: resultRows.length,
          search: loadEnd,
          rowsPerPageOptions: [10]
        }}
      />
      {open ? (
        <VerificationDialog
          txData={clickedRow}
          open={open}
          onClick
          handleClose={handleClose}
        />
      ) : null}
    </Box>
  )
}

export default RegistriesTable
