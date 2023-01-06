import config from '../../config';
import {
    getUsersStart,
    getUsersSuccess,
    getUsersFailure,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure,
    updateUserStart,
    updateUserSuccess,
    updateUserFailure
} from './UserActions';
import { axiosHandler, errorHandler } from '../../utils/utils';

// UPDATE LIST
const updateUser = async (id, updateData, dispatch) => {
    dispatch(updateUserStart());
    try {
        const res = await axiosHandler({
            method: 'put',
            url: `${config.proxy}/users/` + id,
            data: updateData,
            token: JSON.parse(localStorage.getItem('user')).accessToken
        }).catch((e) => console.log(errorHandler(e)));
        dispatch(updateUserSuccess(res.data));
    } catch (err) {
        dispatch(updateUserFailure());
    }
};

// DELETE USER
const deleteUser = async (id, dispatch) => {
    dispatch(deleteUserStart());
    try {
        await axiosHandler({
            method: 'delete',
            url: `${config.proxy}/users/` + id,
            token: JSON.parse(localStorage.getItem('user')).accessToken
        }).catch((e) => console.log(errorHandler(e)));
        dispatch(deleteUserSuccess(id));
    } catch (err) {
        dispatch(deleteUserFailure());
    }
};

// GET USERS
const getUsers = async (dispatch) => {
    dispatch(getUsersStart());
    try {
        const res = await axiosHandler({
            method: 'get',
            url: `${config.proxy}/users`,
            token: JSON.parse(localStorage.getItem('user')).accessToken
        }).catch((e) => console.log(errorHandler(e)));
        dispatch(getUsersSuccess(res.data));
    } catch (err) {
        dispatch(getUsersFailure());
    }
};

export { getUsers, deleteUser, updateUser };
