import { gridSpacing } from 'store/constant';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import MainCard from 'ui-component/cards/MainCard';
import { useContext, useState } from 'react';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { createCategory } from '../../context/categoryContext/apiCall';
import { CategoryContext } from '../../context/categoryContext/CategoryContext';
import { Grid, Button, Box, FormControl, InputLabel, OutlinedInput } from '@mui/material';

const NewCategory = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [category, setCategory] = useState(null);
    const { dispatch } = useContext(CategoryContext);

    const handleChange = (e) => {
        const value = e.target.value;
        setCategory({ ...category, [e.target.name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createCategory(category, dispatch);
        navigate('/categorys');
    };

    return (
        <MainCard title="New Category" button>
            <MainCard title="Create Category">
                <form noValidate>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                <InputLabel htmlFor="outlined-adornment-title-create">Title</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-title-create"
                                    type="text"
                                    name="title"
                                    onChange={handleChange}
                                    label="title"
                                    inputProps={{}}
                                />
                            </FormControl>
                            <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                <InputLabel htmlFor="outlined-adornment-genre-create">Description</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-genre-create"
                                    type="text"
                                    name="genre"
                                    onChange={handleChange}
                                    label="genre"
                                    inputProps={{}}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box sx={{ mt: 2 }}>
                                <AnimateButton>
                                    <Button
                                        disableElevation
                                        fullWidth
                                        size="large"
                                        onClick={handleSubmit}
                                        variant="contained"
                                        color="secondary"
                                    >
                                        Create
                                    </Button>
                                </AnimateButton>
                            </Box>
                        </Grid>
                    </Grid>
                </form>
            </MainCard>
        </MainCard>
    );
};

export default NewCategory;
