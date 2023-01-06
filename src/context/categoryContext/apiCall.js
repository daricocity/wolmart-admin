import config from '../../config';
import {
    getCategorysStart,
    getCategorysSuccess,
    getCategorysFailure,
    deleteCategoryStart,
    deleteCategorySuccess,
    deleteCategoryFailure,
    createCategoryStart,
    createCategorySuccess,
    createCategoryFailure,
    updateCategoryStart,
    updateCategorySuccess,
    updateCategoryFailure
} from './CategoryActions';
import { axiosHandler, errorHandler } from '../../utils/utils';

// UPDATE CATEGORY
const updateCategory = async (id, category, dispatch) => {
    dispatch(updateCategoryStart());
    try {
        const res = await axiosHandler({
            method: 'put',
            url: `${config.proxy}/categorys/` + id,
            data: category,
            token: JSON.parse(localStorage.getItem('user')).accessToken
        }).catch((e) => console.log(errorHandler(e)));
        dispatch(updateCategorySuccess(res.data));
    } catch (err) {
        dispatch(updateCategoryFailure());
    }
};

// DELETE CATEGORY
const deleteCategory = async (id, dispatch) => {
    dispatch(deleteCategoryStart());
    try {
        await axiosHandler({
            method: 'delete',
            url: `${config.proxy}/categorys/` + id,
            token: JSON.parse(localStorage.getItem('user')).accessToken
        }).catch((e) => console.log(errorHandler(e)));
        dispatch(deleteCategorySuccess(id));
    } catch (err) {
        dispatch(deleteCategoryFailure());
    }
};

// GET CATEGORYS
const getCategorys = async (dispatch) => {
    dispatch(getCategorysStart());
    try {
        const res = await axiosHandler({
            method: 'get',
            url: `${config.proxy}/categorys`,
            token: JSON.parse(localStorage.getItem('user')).accessToken
        }).catch((e) => console.log(errorHandler(e)));
        dispatch(getCategorysSuccess(res.data));
    } catch (err) {
        dispatch(getCategorysFailure());
    }
};

// CREATE CATEGORY
const createCategory = async (category, dispatch) => {
    dispatch(createCategoryStart());
    try {
        const res = await axiosHandler({
            method: 'post',
            url: `${config.proxy}/categorys/`,
            data: category,
            token: JSON.parse(localStorage.getItem('user')).accessToken
        }).catch((e) => console.log(errorHandler(e)));
        dispatch(createCategorySuccess(res.data));
    } catch (err) {
        dispatch(createCategoryFailure());
    }
};

export { getCategorys, deleteCategory, createCategory, updateCategory };
