import React from 'react'
import PropTypes from 'prop-types'
import {makeStyles, useTheme, withStyles} from '@material-ui/core/styles'
import {Link as RouterLink} from 'react-router-dom'
import Link from '@material-ui/core/Link'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableFooter from '@material-ui/core/TableFooter'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import FirstPageIcon from '@material-ui/icons/FirstPage'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import LastPageIcon from '@material-ui/icons/LastPage'

const useStyles1 = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing(2.5)
  }
}))

function TablePaginationActions(props) {
  const classes = useStyles1()
  const theme = useTheme()
  const {count, page, rowsPerPage, onChangePage} = props

  function handleFirstPageButtonClick(event) {
    onChangePage(event, 0)
  }

  function handleBackButtonClick(event) {
    onChangePage(event, page - 1)
  }

  function handleNextButtonClick(event) {
    onChangePage(event, page + 1)
  }

  function handleLastPageButtonClick(event) {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
  }

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="First Page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="Previous Page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="Next Page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="Last Page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  )
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
}

const useStyles2 = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3)
  },
  table: {
    minWidth: 700
  },
  tableWrapper: {
    overflowX: 'auto'
  }
}))

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell)

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default
    }
  }
}))(TableRow)

export default function ProblemsSolved(props) {
  const classes = useStyles2()
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const {roomHistory} = props

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, roomHistory.length - page * rowsPerPage)

  function handleChangePage(event, newPage) {
    setPage(newPage)
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <Paper className={classes.root}>
      <div className={classes.tableWrapper}>
        <Table className={classes.table}>
          <TableBody>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Room Id</StyledTableCell>
              <StyledTableCell>Instructions</StyledTableCell>
              <StyledTableCell>Result</StyledTableCell>
              <StyledTableCell>Points Earned</StyledTableCell>
            </TableRow>
            {roomHistory
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(problem => (
                <StyledTableRow key={problem.id}>
                  <StyledTableCell>{problem.name}</StyledTableCell>
                  <StyledTableCell align="left">
                    <Link
                      component={RouterLink}
                      color="inherit"
                      to={`/rooms/${problem.id}`}
                      className={classes.navlinks}
                    >
                      {problem.id}
                    </Link>
                  </StyledTableCell>
                  <StyledTableCell>{problem.instructions}</StyledTableCell>
                  <StyledTableCell>
                    {problem.solved === true ? 'Solved' : 'Pending'}
                  </StyledTableCell>
                  <StyledTableCell>
                    {problem.solved === true ? problem.points : 0}
                  </StyledTableCell>
                </StyledTableRow>
              ))}

            {emptyRows > 0 && (
              <StyledTableRow style={{height: 48 * emptyRows}}>
                <TableCell colSpan={6} />
              </StyledTableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                colSpan={3}
                count={roomHistory.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {'aria-label': 'Rows per page'},
                  native: true
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </Paper>
  )
}
