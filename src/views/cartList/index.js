import PropTypes from 'prop-types';
import {
    EnhancedTableToolbar,
    stableSort,
    getComparator,
    StyledTableRow,
    EnhancedTableHead,
    TablePaginationActions
} from '../../ui-component/table/table';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/utils';
import { IconEditCircle } from '@tabler/icons';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import MainCard from 'ui-component/cards/MainCard';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useContext, useEffect } from 'react';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import FormControlLabel from '@mui/material/FormControlLabel';
import { CartContext } from '../../context/cartContext/CartContext';
import { deleteCart, getCarts } from '../../context/cartContext/apiCall';
import SkeletonTotalGrowthBarChart from 'ui-component/cards/Skeleton/TotalGrowthBarChart';
import { Fab, Box, Paper, Table, Switch, Tooltip, TableRow, Checkbox } from '@mui/material';

const headCells = [
    {
        id: '_id',
        numeric: false,
        disablePadding: true,
        label: 'Cart Id'
    },
    {
        id: 'userId',
        numeric: true,
        disablePadding: false,
        label: 'User Id'
    },
    {
        id: 'products',
        numeric: true,
        disablePadding: false,
        label: 'Product Count'
    },
    {
        id: 'createdAt',
        numeric: false,
        disablePadding: false,
        label: 'Date Created'
    },
    {
        id: '',
        numeric: false,
        disablePadding: false,
        label: 'Action'
    }
];

const CartTable = (props) => {
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [order, setOrder] = useState('asc');
    const [selected, setSelected] = useState([]);
    const [orderBy, setOrderBy] = useState('_id');
    const { data, handleDelete, isLoading } = props;
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleRequestSort = (e, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (e) => {
        if (e.target.checked) {
            const newSelected = data.map((n) => n._id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (e, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }
        setSelected(newSelected);
    };

    const handleChangePage = (e, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = () => {
        setRowsPerPage(parseInt(encodeURI.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (e) => {
        setDense(e.target.checked);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

    return (
        <>
            {isLoading ? (
                <SkeletonTotalGrowthBarChart />
            ) : (
                <Box sx={{ width: '100%' }}>
                    <Paper sx={{ width: '100%', mb: 2 }}>
                        <EnhancedTableToolbar numSelected={selected.length} selected={selected} handleDelete={handleDelete} />
                        <TableContainer style={{ marginTop: '-50px' }}>
                            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
                                <EnhancedTableHead
                                    numSelected={selected.length}
                                    order={order}
                                    orderBy={orderBy}
                                    onSelectAllClick={handleSelectAllClick}
                                    onRequestSort={handleRequestSort}
                                    rowCount={data?.length}
                                    headCells={headCells}
                                />
                                <TableBody>
                                    {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                                        rows.slice().sort(getComparator(order, orderBy)) */}
                                    {stableSort(data, getComparator(order, orderBy))
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row, index) => {
                                            const isItemSelected = isSelected(row._id);
                                            const labelId = `enhanced-table-checkbox-${index}`;
                                            return (
                                                <StyledTableRow
                                                    hover
                                                    onClick={(event) => handleClick(event, row._id)}
                                                    role="checkbox"
                                                    aria-checked={isItemSelected}
                                                    tabIndex={-1}
                                                    key={row._id}
                                                    selected={isItemSelected}
                                                >
                                                    <TableCell padding="checkbox">
                                                        <Checkbox
                                                            color="primary"
                                                            checked={isItemSelected}
                                                            inputProps={{
                                                                'aria-labelledby': labelId
                                                            }}
                                                        />
                                                    </TableCell>
                                                    <TableCell component="th" id={labelId} scope="row" padding="none">
                                                        {row._id}
                                                    </TableCell>
                                                    <TableCell align="center">{row.userId}</TableCell>
                                                    <TableCell align="center">{row.products.length}</TableCell>
                                                    <TableCell align="center">{formatDate(row.createdAt)}</TableCell>
                                                    <TableCell align="center">
                                                        <Link to={{ pathname: '/cart/' + row._id }} state={{ cart: row }}>
                                                            <Fab
                                                                color="secondary"
                                                                aria-label="delete"
                                                                size="small"
                                                                style={{ marginRight: '20px' }}
                                                            >
                                                                <IconEditCircle />
                                                            </Fab>
                                                        </Link>
                                                        <Tooltip title="Delete">
                                                            <Fab color="error" aria-label="delete" size="small">
                                                                <DeleteIcon
                                                                    onClick={() => handleDelete(row._id)}
                                                                    style={{ cursor: 'pointer', fontSize: '15px' }}
                                                                />
                                                            </Fab>
                                                        </Tooltip>
                                                    </TableCell>
                                                </StyledTableRow>
                                            );
                                        })}
                                    {emptyRows > 0 && (
                                        <TableRow
                                            style={{
                                                height: (dense ? 33 : 53) * emptyRows
                                            }}
                                        >
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            component="div"
                            count={data.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </Paper>
                    <FormControlLabel control={<Switch checked={dense} onChange={handleChangeDense} />} label="Small Table" />
                </Box>
            )}
        </>
    );
};

const CartList = () => {
    const [isLoading, setLoading] = useState(true);
    const { carts, dispatch } = useContext(CartContext);

    useEffect(() => {
        getCarts(dispatch);
        setLoading(false);
    }, [dispatch]);

    const handleDelete = (id) => {
        deleteCart(id, dispatch);
    };

    return (
        <MainCard title="Cart List" categoryListSection>
            <CartTable data={carts} handleDelete={handleDelete} isLoading={isLoading} />
        </MainCard>
    );
};

CartTable.propTypes = {
    data: PropTypes.array,
    isLoading: PropTypes.bool,
    handleDelete: PropTypes.func
};

export default CartList;
