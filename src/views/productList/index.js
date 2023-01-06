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
import { IconEditCircle } from '@tabler/icons';
import { useTheme } from '@mui/material/styles';
import MainCard from 'ui-component/cards/MainCard';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useContext, useEffect } from 'react';
import TableContainer from '@mui/material/TableContainer';
import { capitalizeFirstLetter } from '../../utils/utils';
import TablePagination from '@mui/material/TablePagination';
import FormControlLabel from '@mui/material/FormControlLabel';
import { getCategorys } from '../../context/categoryContext/apiCall';
import { ProductContext } from '../../context/productContext/ProductContext';
import { CategoryContext } from '../../context/categoryContext/CategoryContext';
import { deleteProduct, getProducts } from '../../context/productContext/apiCall';
import SkeletonTotalGrowthBarChart from 'ui-component/cards/Skeleton/TotalGrowthBarChart';
import { Fab, Box, Paper, Table, Switch, Tooltip, TableRow, Checkbox, TableCell, TableBody, Grid, Avatar } from '@mui/material';

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
        label: 'Title'
    },
    {
        id: 'categories',
        numeric: false,
        disablePadding: false,
        label: 'Category'
    },
    {
        id: 'price',
        numeric: false,
        disablePadding: false,
        label: 'Price'
    },
    {
        id: 'inStock',
        numeric: false,
        disablePadding: false,
        label: 'In Stock'
    },
    {
        id: 'flashDeal',
        numeric: false,
        disablePadding: false,
        label: 'Flash Deal'
    },
    {
        id: '',
        numeric: false,
        disablePadding: false,
        label: 'Action'
    }
];

const ProductTable = (props) => {
    const theme = useTheme();
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [order, setOrder] = useState('asc');
    const [selected, setSelected] = useState([]);
    const [orderBy, setOrderBy] = useState('_id');
    const { data, handleDelete, isLoading } = props;
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
                        <EnhancedTableToolbar numSelected={selected.length} selected={selected} handleDelete={handleDelete} />
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
                                                        {row._id}
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
                                                                    style={{ width: '40px', height: '40px', marginRight: '10px' }}
                                                                />
                                                            </Grid>
                                                            <Grid item>{capitalizeFirstLetter(row.title)}</Grid>
                                                        </Grid>
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {row.categories.length === 1
                                                            ? row.categories.length + ' Category'
                                                            : row.categories.length + ' Categories'}
                                                    </TableCell>
                                                    <TableCell align="center">{row.price}</TableCell>
                                                    <TableCell align="center">{row.inStock.toString()}</TableCell>
                                                    <TableCell align="center">{row.flashDeal.toString()}</TableCell>
                                                    <TableCell align="center">
                                                        <Link to={{ pathname: '/product/' + row._id }} state={{ product: row }}>
                                                            <Fab
                                                                color="secondary"
                                                                aria-label="edit"
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

const ProductList = () => {
    const [isLoading, setLoading] = useState(true);
    const { products, dispatch } = useContext(ProductContext);
    const { categorys, dispatch: catDispatch } = useContext(CategoryContext);

    const arr = products.map((pro) => pro.categories);
    let cate = [];
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            cate.push(categorys.find((cat) => cat._id === arr[i].map((m) => m)[j])?.title + ', ');
        }
    }

    useEffect(() => {
        getCategorys(catDispatch);
        getProducts(dispatch);
        setLoading(false);
    }, [dispatch, catDispatch]);

    const handleDelete = (id) => {
        deleteProduct(id, dispatch);
    };

    return (
        <MainCard title="Products" button productListSection>
            <ProductTable data={products} handleDelete={handleDelete} isLoading={isLoading} />
        </MainCard>
    );
};

ProductTable.propTypes = {
    data: PropTypes.array,
    catData: PropTypes.array,
    isLoading: PropTypes.bool,
    handleDelete: PropTypes.func
};

export default ProductList;
