import { Formik } from 'formik';
import { useContext } from 'react';
import { gridSpacing } from 'store/constant';
import useScriptRef from 'hooks/useScriptRef';
import { useTheme } from '@mui/material/styles';
import MainCard from 'ui-component/cards/MainCard';
import { capitalizeFirstLetter } from '../../utils';
import { useLocation, useNavigate } from 'react-router-dom';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { updateCategory } from '../../context/categoryContext/apiCall';
import { CategoryContext } from '../../context/categoryContext/CategoryContext';
import { Grid, CardContent, Button, Divider, Typography, Box, FormControl, FormHelperText, InputLabel, OutlinedInput } from '@mui/material';

const Category = ({ ...others }) => {
    const theme = useTheme();
    const location = useLocation();
    const navigate = useNavigate();
    const scriptedRef = useScriptRef();
    const { category } = location.state;
    const { dispatch } = useContext(CategoryContext);

    return (
        <MainCard title="Category" button movieSection>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} md={6}>
                            <MainCard content={false} title="Category Info">
                                <CardContent>
                                    <Grid item xs={12}>
                                        <Grid container direction="column" spacing={1}>
                                            <Grid item>
                                                <Typography variant="subtitle2">Title</Typography>
                                            </Grid>
                                            <Grid container alignItems="center" justifyContent="flex-start">
                                                <Grid item>
                                                    <Typography variant="p" style={{ marginLeft: '10px' }}>
                                                        {capitalizeFirstLetter(category.title)}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Divider sx={{ my: 1.5 }} />
                                    <Grid item xs={12}>
                                        <Grid container direction="column" spacing={1}>
                                            <Grid item>
                                                <Typography variant="subtitle2">Id</Typography>
                                            </Grid>
                                            <Grid container alignItems="center" justifyContent="flex-start">
                                                <Grid item>
                                                    <Typography variant="p" style={{ marginLeft: '10px' }}>
                                                        {category._id}
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
                                                        {category.desc}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </MainCard>
                        </Grid>
                        {/* LEFT */}
                        <Grid item xs={12} md={6}>
                            <MainCard title="Edit Info">
                                <Grid container alignItems="center" justifyContent="space-between">
                                    <Grid item xs={12}>
                                        <Formik
                                            initialValues={{
                                                title: category.title,
                                                desc: category.desc,
                                                submit: null
                                            }}
                                            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                                                try {
                                                    if (scriptedRef.current) {
                                                        updateCategory(category._id, values, dispatch);
                                                        setStatus({ success: true });
                                                        setSubmitting(false);
                                                        navigate('/categorys');
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
                                </Grid>
                            </MainCard>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default Category;
