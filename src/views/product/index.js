import {
    Grid,
    CardContent,
    Avatar,
    Button,
    Divider,
    Typography,
    Box,
    FormControl,
    FormHelperText,
    InputLabel,
    OutlinedInput,
    Select,
    MenuItem
} from '@mui/material';
import { Formik } from 'formik';
import Tooltip from '@mui/material/Tooltip';
import { gridSpacing } from 'store/constant';
import { useContext, useEffect } from 'react';
import useScriptRef from 'hooks/useScriptRef';
import { formatDate } from '../../utils/utils';
import { useTheme } from '@mui/material/styles';
import MainCard from 'ui-component/cards/MainCard';
import { capitalizeFirstLetter } from '../../utils';
import PublishIcon from '@mui/icons-material/Publish';
import { useLocation, useNavigate } from 'react-router-dom';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { getCategorys } from '../../context/categoryContext/apiCall';
import { updateProduct } from '../../context/productContext/apiCall';
import { ProductContext } from '../../context/productContext/ProductContext';
import { CategoryContext } from '../../context/categoryContext/CategoryContext';

const Product = ({ ...others }) => {
    const theme = useTheme();
    const location = useLocation();
    const navigate = useNavigate();
    const { product } = location.state;
    const scriptedRef = useScriptRef();
    const { dispatch } = useContext(ProductContext);
    const { categorys, dispatch: dispatchCategory } = useContext(CategoryContext);

    useEffect(() => {
        getCategorys(dispatchCategory);
    }, [dispatchCategory]);

    const arr = product.categories.map((proCat) => proCat);
    let productCategoryTitle = [];
    for (let i = 0; i < arr.length; i++) {
        productCategoryTitle.push(categorys.find((cat) => cat._id === arr[i])?.title + ', ');
    }

    return (
        <MainCard title="Product" button productSection>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} md={4}>
                            <MainCard content={false} title="Product Info">
                                <CardContent>
                                    <Grid container spacing={gridSpacing}>
                                        <Grid item xs={12}>
                                            <Grid container alignItems="center" justifyContent="flex-start">
                                                <Grid item>
                                                    <Avatar
                                                        src={product.img}
                                                        sx={{
                                                            ...theme.typography.mediumAvatar,
                                                            cursor: 'pointer'
                                                        }}
                                                        aria-haspopup="true"
                                                        color="inherit"
                                                        style={{ width: '40px', height: '40px', marginRight: '10px' }}
                                                    />
                                                </Grid>
                                                <Grid item>
                                                    <Typography variant="span">
                                                        <Typography variant="h3">{capitalizeFirstLetter(product.title)}</Typography>
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Divider sx={{ my: 1.5 }} />
                                    <Grid item xs={12}>
                                        <Grid container direction="column" spacing={1}>
                                            <Grid item>
                                                <Typography variant="subtitle2">Description</Typography>
                                            </Grid>
                                            <Grid container alignItems="center" justifyContent="flex-start">
                                                <Grid item>
                                                    <Typography variant="p" style={{ marginLeft: '10px' }}>
                                                        {product.desc}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Divider sx={{ my: 1.5 }} />
                                    <Grid item xs={12}>
                                        <Grid container direction="column" spacing={1}>
                                            <Grid item>
                                                <Typography variant="subtitle2">Price</Typography>
                                            </Grid>
                                            <Grid container alignItems="center" justifyContent="flex-start">
                                                <Grid item>
                                                    <Typography variant="p" style={{ marginLeft: '10px' }}>
                                                        {product.price}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Divider sx={{ my: 1.5 }} />
                                    <Grid item xs={12}>
                                        <Grid container direction="column" spacing={1}>
                                            <Grid item>
                                                <Typography variant="subtitle2">In Stock</Typography>
                                            </Grid>
                                            <Grid container alignItems="center" justifyContent="flex-start">
                                                <Grid item>
                                                    <Typography variant="p" style={{ marginLeft: '10px' }}>
                                                        {product.inStock.toString()}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Divider sx={{ my: 1.5 }} />
                                    <Grid item xs={12}>
                                        <Grid container direction="column" spacing={1}>
                                            <Grid item>
                                                <Typography variant="subtitle2">Category(s)</Typography>
                                            </Grid>
                                            <Grid container alignItems="center" justifyContent="flex-start">
                                                <Grid item>
                                                    <Typography variant="p" style={{ marginLeft: '10px' }}>
                                                        {productCategoryTitle}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Divider sx={{ my: 1.5 }} />
                                    <Grid item xs={12}>
                                        <Grid container direction="column" spacing={1}>
                                            <Grid item>
                                                <Typography variant="subtitle2">Date Created</Typography>
                                            </Grid>
                                            <Grid container alignItems="center" justifyContent="flex-start">
                                                <Grid item>
                                                    <Typography variant="p" style={{ marginLeft: '10px' }}>
                                                        {formatDate(product.createdAt ? product.createdAt : product.updatedAt)}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Divider sx={{ my: 1.5 }} />
                                    <Grid item xs={12}>
                                        <Grid container direction="column" spacing={1}>
                                            <Grid item>
                                                <Typography variant="subtitle2">Flash Deal</Typography>
                                            </Grid>
                                            <Grid container alignItems="center" justifyContent="flex-start">
                                                <Grid item>
                                                    <Typography variant="p" style={{ marginLeft: '10px' }}>
                                                        {product.flashDeal.toString()}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </MainCard>
                        </Grid>
                        {/* LEFT */}
                        <Grid item xs={12} md={8}>
                            <MainCard title="Edit Info">
                                <Grid container alignItems="center" justifyContent="space-between">
                                    <Grid item xs={12} lg={6}>
                                        <Formik
                                            initialValues={{
                                                title: product.title,
                                                desc: product.desc,
                                                price: product.price,
                                                inStock: product.inStock,
                                                flashDeal: product.flashDeal,
                                                categories: product.categories,
                                                submit: null
                                            }}
                                            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                                                try {
                                                    if (scriptedRef.current) {
                                                        updateProduct(product._id, values, dispatch);
                                                        setStatus({ success: true });
                                                        setSubmitting(false);
                                                        navigate('/products');
                                                    }
                                                } catch (err) {
                                                    console.error(err);
                                                    if (scriptedRef.current) {
                                                        setStatus({ success: false });
                                                        setErrors({ submit: err.message });
                                                        setSubmitting(false);
                                                    }
                                                }
                                            }}
                                        >
                                            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                                                <form noValidate onSubmit={handleSubmit} {...others}>
                                                    <FormControl
                                                        fullWidth
                                                        error={Boolean(touched.title && errors.title)}
                                                        sx={{ ...theme.typography.customInput }}
                                                    >
                                                        <InputLabel htmlFor="outlined-adornment-title-update">Title</InputLabel>
                                                        <OutlinedInput
                                                            id="outlined-adornment-title-update"
                                                            type="text"
                                                            value={values.title}
                                                            name="title"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            label="title"
                                                            inputProps={{}}
                                                        />
                                                        {touched.title && errors.title && (
                                                            <FormHelperText error id="standard-weight-helper-text-title-update">
                                                                {errors.title}
                                                            </FormHelperText>
                                                        )}
                                                    </FormControl>
                                                    <FormControl
                                                        fullWidth
                                                        error={Boolean(touched.desc && errors.desc)}
                                                        sx={{ ...theme.typography.customInput }}
                                                    >
                                                        <InputLabel htmlFor="outlined-adornment-desc-update">Description</InputLabel>
                                                        <OutlinedInput
                                                            id="outlined-adornment-desc-update"
                                                            type="text"
                                                            value={values.desc}
                                                            name="desc"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            label="desc"
                                                            inputProps={{}}
                                                        />
                                                        {touched.desc && errors.desc && (
                                                            <FormHelperText error id="standard-weight-helper-text-desc-update">
                                                                {errors.desc}
                                                            </FormHelperText>
                                                        )}
                                                    </FormControl>
                                                    <FormControl
                                                        fullWidth
                                                        error={Boolean(touched.price && errors.price)}
                                                        sx={{ ...theme.typography.customInput }}
                                                    >
                                                        <InputLabel htmlFor="outlined-adornment-price-update">Pirce</InputLabel>
                                                        <OutlinedInput
                                                            id="outlined-adornment-price-update"
                                                            type="text"
                                                            value={values.price}
                                                            name="price"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            label="Price"
                                                            inputProps={{}}
                                                        />
                                                        {touched.price && errors.price && (
                                                            <FormHelperText error id="standard-weight-helper-text-price-update">
                                                                {errors.price}
                                                            </FormHelperText>
                                                        )}
                                                    </FormControl>
                                                    <FormControl
                                                        fullWidth
                                                        error={Boolean(touched.inStock && errors.inStock)}
                                                        sx={{ ...theme.typography.customInput }}
                                                    >
                                                        <InputLabel id="demo-simple-select-readonly-label">Select inStock</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-readonly-label"
                                                            id="demo-simple-select-readonly"
                                                            value={values.inStock}
                                                            label="inStock"
                                                            name="inStock"
                                                            onChange={handleChange}
                                                            inputProps={{}}
                                                        >
                                                            <MenuItem value="false">No</MenuItem>
                                                            <MenuItem value="true">Yes</MenuItem>
                                                        </Select>
                                                        {touched.inStock && errors.inStock && (
                                                            <FormHelperText error id="standard-weight-helper-text-isSeries-update">
                                                                {errors.inStock}
                                                            </FormHelperText>
                                                        )}
                                                    </FormControl>
                                                    <FormControl
                                                        fullWidth
                                                        error={Boolean(touched.flashDeal && errors.flashDeal)}
                                                        sx={{ ...theme.typography.customInput }}
                                                    >
                                                        <InputLabel id="flashDeal-select-readonly-label">Select flashDeal</InputLabel>
                                                        <Select
                                                            labelId="flashDeal-select-readonly-label"
                                                            id="flashDeal-select-readonly"
                                                            value={values.flashDeal}
                                                            label="flashDeal"
                                                            name="flashDeal"
                                                            onChange={handleChange}
                                                            inputProps={{}}
                                                        >
                                                            <MenuItem value="false">No</MenuItem>
                                                            <MenuItem value="true">Yes</MenuItem>
                                                        </Select>
                                                        {touched.flashDeal && errors.flashDeal && (
                                                            <FormHelperText error id="standard-weight-helper-text-isSeries-update">
                                                                {errors.flashDeal}
                                                            </FormHelperText>
                                                        )}
                                                    </FormControl>
                                                    <FormControl
                                                        fullWidth
                                                        error={Boolean(touched.categories && errors.categories)}
                                                        sx={{ ...theme.typography.customInput }}
                                                    >
                                                        <InputLabel id="demo-simple-select-readonly-label">Select categories</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-readonly-label"
                                                            id="demo-simple-select-readonly"
                                                            value={values.categories}
                                                            label="categories"
                                                            name="categories"
                                                            multiple
                                                            onChange={handleChange}
                                                            inputProps={{}}
                                                        >
                                                            {categorys.map((category) => (
                                                                <MenuItem key={category._id} value={category._id}>
                                                                    {category.title}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                        {touched.categories && errors.categories && (
                                                            <FormHelperText error id="standard-weight-helper-text-isSeries-update">
                                                                {errors.categories}
                                                            </FormHelperText>
                                                        )}
                                                    </FormControl>
                                                    {errors.submit && (
                                                        <Box sx={{ mt: 3 }}>
                                                            <FormHelperText error>{errors.submit}</FormHelperText>
                                                        </Box>
                                                    )}

                                                    <Box sx={{ mt: 2 }}>
                                                        <AnimateButton>
                                                            <Button
                                                                disableElevation
                                                                disabled={isSubmitting}
                                                                fullWidth
                                                                size="large"
                                                                type="submit"
                                                                variant="contained"
                                                                color="secondary"
                                                            >
                                                                Update
                                                            </Button>
                                                        </AnimateButton>
                                                    </Box>
                                                </form>
                                            )}
                                        </Formik>
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <MainCard style={{ width: '200px', height: '270px', float: 'right' }} sx={{ mt: 3 }}>
                                            <img
                                                src={product?.img}
                                                alt="Profile Pics"
                                                style={{ width: '150px', height: '150px', borderRadius: '10px' }}
                                            />
                                            <Divider sx={{ my: 1.5 }} />
                                            <AnimateButton>
                                                <Tooltip title="Change Profile Image">
                                                    <Button
                                                        disableElevation
                                                        fullWidth
                                                        size="large"
                                                        type="file"
                                                        variant="contained"
                                                        color="secondary"
                                                    >
                                                        <PublishIcon />
                                                    </Button>
                                                </Tooltip>
                                            </AnimateButton>
                                        </MainCard>
                                    </Grid>
                                </Grid>
                            </MainCard>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default Product;
