import config from '../../config';
import {
    getProductsStart,
    getProductsSuccess,
    getProductsFailure,
    deleteProductStart,
    deleteProductSuccess,
    deleteProductFailure,
    createProductStart,
    createProductSuccess,
    createProductFailure,
    updateProductStart,
    updateProductSuccess,
    updateProductFailure
} from './ProductActions';
import { axiosHandler, errorHandler } from '../../utils/utils';

// UPDATE PRODUCT
const updateProduct = async (id, productData, dispatch) => {
    dispatch(updateProductStart());
    try {
        const res = await axiosHandler({
            method: 'put',
            url: `${config.proxy}/products/` + id,
            data: productData,
            token: JSON.parse(localStorage.getItem('user')).accessToken
        }).catch((e) => console.log(errorHandler(e)));
        dispatch(updateProductSuccess(res.data));
    } catch (err) {
        dispatch(updateProductFailure());
    }
};

// DELETE PRODUCT
const deleteProduct = async (id, dispatch) => {
    dispatch(deleteProductStart());
    try {
        await axiosHandler({
            method: 'delete',
            url: `${config.proxy}/products/` + id,
            token: JSON.parse(localStorage.getItem('user')).accessToken
        }).catch((e) => console.log(errorHandler(e)));
        dispatch(deleteProductSuccess(id));
    } catch (err) {
        dispatch(deleteProductFailure());
    }
};

// GET PRODUCTS
const getProducts = async (dispatch) => {
    dispatch(getProductsStart());
    try {
        const res = await axiosHandler({
            method: 'get',
            url: `${config.proxy}/products`,
            token: JSON.parse(localStorage.getItem('user')).accessToken
        }).catch((e) => console.log(errorHandler(e)));
        dispatch(getProductsSuccess(res.data));
    } catch (err) {
        dispatch(getProductsFailure());
    }
};

// CREATE PRODUCT
const createProduct = async (productData, dispatch) => {
    dispatch(createProductStart());
    try {
        const res = await axiosHandler({
            method: 'post',
            url: `${config.proxy}/products/`,
            data: productData,
            token: JSON.parse(localStorage.getItem('user')).accessToken
        }).catch((e) => console.log(errorHandler(e)));
        dispatch(createProductSuccess(res.data));
    } catch (err) {
        dispatch(createProductFailure());
    }
};

export { getProducts, deleteProduct, createProduct, updateProduct };
