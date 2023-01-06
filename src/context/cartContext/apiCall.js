import config from '../../config';
import { axiosHandler, errorHandler } from '../../utils/utils';
import { getCartsStart, getCartsSuccess, getCartsFailure, deleteCartStart, deleteCartSuccess, deleteCartFailure } from './CartActions';

// DELETE CART
const deleteCart = async (id, dispatch) => {
    dispatch(deleteCartStart());
    try {
        await axiosHandler({
            method: 'delete',
            url: `${config.proxy}/carts/` + id,
            token: JSON.parse(localStorage.getItem('user')).accessToken
        }).catch((e) => console.log(errorHandler(e)));
        dispatch(deleteCartSuccess(id));
    } catch (err) {
        dispatch(deleteCartFailure());
    }
};

// GET ALL CARTS
const getCarts = async (dispatch) => {
    dispatch(getCartsStart());
    try {
        const res = await axiosHandler({
            method: 'get',
            url: `${config.proxy}/carts`,
            token: JSON.parse(localStorage.getItem('user')).accessToken
        }).catch((e) => console.log(errorHandler(e)));
        dispatch(getCartsSuccess(res.data));
    } catch (err) {
        dispatch(getCartsFailure());
    }
};

export { getCarts, deleteCart };
