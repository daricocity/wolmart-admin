import app from '../../firebase';
import { gridSpacing } from 'store/constant';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import MainCard from 'ui-component/cards/MainCard';
import { useContext, useState, useEffect } from 'react';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { createProduct } from '../../context/productContext/apiCall';
import { getCategorys } from '../../context/categoryContext/apiCall';
import { ProductContext } from '../../context/productContext/ProductContext';
import { CategoryContext } from '../../context/categoryContext/CategoryContext';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { Grid, Button, Box, FormControl, InputLabel, OutlinedInput, Select, MenuItem, Input, FormHelperText } from '@mui/material';

const NewProduct = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const storage = getStorage(app);
    const [img, setImg] = useState(null);
    const [product, setProduct] = useState(null);
    const [uploaded, setUploaded] = useState(0);
    const { dispatch } = useContext(ProductContext);
    const [categoryList, setCategoryList] = useState([]);
    const { categorys, dispatch: dispatchCategory } = useContext(CategoryContext);

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250
            }
        }
    };

    useEffect(() => {
        getCategorys(dispatchCategory);
    }, [dispatchCategory]);

    const handleChange = (e) => {
        const value = e.target.value;
        setProduct({ ...product, [e.target.name]: value });
    };

    const handleSelect = (e) => {
        const {
            target: { value }
        } = e;
        setProduct({ ...product, [e.target.name]: value });
        setCategoryList(typeof value === 'string' ? value.split(',') : value);
    };

    const upload = (item) => {
        const fileName = new Date().getTime() + item.label + item.file.name;
        const storageRef = ref(storage, `/img/${fileName}`);
        const uploadTask = uploadBytesResumable(storageRef, item.file);

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                    default:
                }
            },
            (err) => {
                // Handle unsuccessful uploads
                console.log(err);
            },
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setProduct((prev) => {
                        return { ...prev, [item.label]: downloadURL };
                    });
                    setUploaded((prev) => prev + 1);
                    console.log('File available at', downloadURL);
                });
            }
        );
    };

    const handleUpload = (e) => {
        e.preventDefault();
        upload({ file: img, label: 'img' });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createProduct(product, dispatch);
        navigate('/products');
    };

    return (
        <MainCard title="New Product" button oneUserSection>
            <MainCard title="Create Your Product">
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
                                <InputLabel htmlFor="outlined-adornment-desc-create">Description</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-desc-create"
                                    type="text"
                                    name="desc"
                                    onChange={handleChange}
                                    label="desc"
                                    inputProps={{}}
                                />
                            </FormControl>
                            <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                <InputLabel htmlFor="outlined-adornment-price-create">Price</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-price-create"
                                    type="text"
                                    name="price"
                                    onChange={handleChange}
                                    label="price"
                                    inputProps={{}}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                <InputLabel id="content-readonly-label">Select Category</InputLabel>
                                <Select
                                    labelId="content-readonly-label"
                                    id="content"
                                    label="content"
                                    name="content"
                                    onChange={handleSelect}
                                    multiple
                                    value={categoryList}
                                    style={{ height: '62px' }}
                                    MenuProps={MenuProps}
                                >
                                    {categorys.map((category) => (
                                        <MenuItem key={category._id} value={category._id}>
                                            {category.title}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText default id="standard-weight-helper-text--register">
                                    Select Multiple Category Content
                                </FormHelperText>
                            </FormControl>
                            <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                <InputLabel id="demo-simple-select-readonly-label">Select InStock</InputLabel>
                                <Select
                                    labelId="demo-simple-select-readonly-label"
                                    id="inStock"
                                    label="inStock"
                                    name="inStock"
                                    onChange={handleChange}
                                    inputProps={{}}
                                >
                                    <MenuItem value="false">No</MenuItem>
                                    <MenuItem value="true">Yes</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                <InputLabel id="flash-deal-select-readonly-label">Select flashDeal</InputLabel>
                                <Select
                                    labelId="flash-deal-select-readonly-label"
                                    id="flashDeal"
                                    label="flashDeal"
                                    name="flashDeal"
                                    onChange={handleChange}
                                    inputProps={{}}
                                >
                                    <MenuItem value="false">No</MenuItem>
                                    <MenuItem value="true">Yes</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                <InputLabel htmlFor="outlined-adornment-img-create">Image</InputLabel>
                                <Input
                                    id="outlined-adornment-img-create"
                                    type="file"
                                    name="img"
                                    onChange={(e) => setImg(e.target.files[0])}
                                    label="img"
                                    inputProps={{}}
                                />
                            </FormControl>
                            {uploaded ? (
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
                            ) : (
                                <Box sx={{ mt: 2 }}>
                                    <AnimateButton>
                                        <Button
                                            disableElevation
                                            fullWidth
                                            size="large"
                                            variant="contained"
                                            color="secondary"
                                            onClick={handleUpload}
                                        >
                                            Upload
                                        </Button>
                                    </AnimateButton>
                                </Box>
                            )}
                        </Grid>
                    </Grid>
                </form>
            </MainCard>
        </MainCard>
    );
};

export default NewProduct;
