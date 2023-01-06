import PropTypes from 'prop-types';
import {
    EnhancedTableToolbar,
    stableSort,
    getComparator,
    StyledTableRow,
    EnhancedTableHead,
    TablePaginationActions
} from '../../ui-component/table/table';
import { useTheme } from '@mui/material/styles';
import MainCard from 'ui-component/cards/MainCard';
import { useLocation, Link } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import FormControlLabel from '@mui/material/FormControlLabel';
import { getProducts } from '../../context/productContext/apiCall';
import { ProductContext } from '../../context/productContext/ProductContext';
import SkeletonTotalGrowthBarChart from 'ui-component/cards/Skeleton/TotalGrowthBarChart';
import { Box, Paper, Table, Switch, TableRow, Checkbox, TableCell, TableBody, Avatar, Grid } from '@mui/material';

const headCells = [
    {
        id: '_id',
        numeric: false,
        disablePadding: true,
        label: 'Product Id'
    },
    {
        id: 'title',
        numeric: true,
        disablePadding: false,
        label: 'Product Name'
    },
    {
        id: 'inStock',
        numeric: false,
        disablePadding: false,
        label: 'In Stock'
    },
    {
        id: 'price',
        numeric: false,
        disablePadding: false,
        label: 'Price'
    },
    {
        id: 'quantity',
        numeric: true,
        disablePadding: false,
        label: 'Quantity'
    },
    {
        id: 'total',
        numeric: false,
        disablePadding: false,
        label: 'Total'
    }
];

const CartDetailTable = (props) => {
    const theme = useTheme();
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [order, setOrder] = useState('asc');
    const [selected, setSelected] = useState([]);
    const [orderBy, setOrderBy] = useState('_id');
    const { data, isLoading, cartSubTotal } = props;
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = data.map((n) => n._id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
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

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
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
                        <EnhancedTableToolbar numSelected={selected.length} selected={selected} />
                        <TableContainer style={{ marginTop: '-50px' }}>
                            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
                                <EnhancedTableHead
                                    numSelected={selected.length}
                                    order={order}
                                    orderBy={orderBy}
                                    onSelectAllClick={handleSelectAllClick}
                                    onRequestSort={handleRequestSort}
                                    rowCount={data.length}
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
                                                        {row.productId}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Grid container alignItems="center" justifyContent="flex-start">
                                                            <Grid item>
                                                                <Avatar
                                                                    src={row.img}
                                                                    sx={{
                                                                        ...theme.typography.mediumAvatar,
                                                                        cursor: 'pointer'
                                                                    }}
                                                                    aria-haspopup="true"
                                                                    color="inherit"
                                                                    style={{ width: '35px', height: '35px', marginRight: '10px' }}
                                                                />
                                                            </Grid>
                                                            <Grid item>
                                                                <Link
                                                                    to={{ pathname: '/product/' + row.productId }}
                                                                    state={{ product: row }}
                                                                    style={{ textDecoration: 'none' }}
                                                                >
                                                                    {row.title}
                                                                </Link>
                                                            </Grid>
                                                        </Grid>
                                                    </TableCell>
                                                    <TableCell align="center">{row.inStock?.toString()}</TableCell>
                                                    <TableCell align="center">{row.price}</TableCell>
                                                    <TableCell align="center">{row.quantity}</TableCell>
                                                    <TableCell align="center">{row.total}</TableCell>
                                                </StyledTableRow>
                                            );
                                        })}
                                    <StyledTableRow style={{ background: '#ede7f6' }}>
                                        <TableCell align="center"></TableCell>
                                        <TableCell align="center"></TableCell>
                                        <TableCell align="center"></TableCell>
                                        <TableCell align="center"></TableCell>
                                        <TableCell align="center"></TableCell>
                                        <TableCell align="center" style={{ fontWeight: 'bold' }}>
                                            Subtotal
                                        </TableCell>
                                        <TableCell align="center" style={{ fontWeight: 'bold' }}>
                                            {cartSubTotal}
                                        </TableCell>
                                    </StyledTableRow>
                                    {emptyRows > 0 && (
                                        <TableRow
                                            style={{
                                                height: (dense ? 33 : 53) * emptyRows
                                            }}
                                        >
                                            <TableCell colSpan={9} />
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

const CartDetail = () => {
    const location = useLocation();
    const { cart } = location.state;
    const [isLoading, setLoading] = useState(true);
    const { products, dispatch } = useContext(ProductContext);

    // Find the Product Details in the Cart Item
    const cartProducts = cart.products.map((CartIndex) => products.find((product) => product._id === CartIndex.productId));

    // Append Each Product Details to its corresponding Cart Details
    let merged = [];
    for (let i = 0; i < cartProducts.length; i++) {
        merged.push({ ...cartProducts[i], ...cart.products[i] });
    }

    // Cart Subtotal
    const arr = cart.products.map((cat) => cat.total);
    let cartSubTotal = 0;
    for (let i = 0; i < arr.length; i++) {
        cartSubTotal += arr[i];
    }

    useEffect(() => {
        getProducts(dispatch);
        setLoading(false);
    }, [dispatch]);

    return (
        <MainCard title="Cart" button cartDetailSection>
            <CartDetailTable data={merged} cartSubTotal={cartSubTotal} isLoading={isLoading} />
        </MainCard>
    );
};

CartDetailTable.propTypes = {
    data: PropTypes.array,
    isLoading: PropTypes.bool,
    cartSubTotal: PropTypes.object
};

export default CartDetail;
