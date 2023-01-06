import config from '../../config';
import { axiosHandler, errorHandler } from '../../utils/utils';
import { loginStart, loginSuccess, loginFailure, logoutUser } from './AuthActions';

// AUTH
const login = async (loginData, dispatch, setError) => {
    dispatch(loginStart());
    try {
        const res = await axiosHandler({
            method: 'post',
            url: `${config.proxy}/auth/login`,
            data: loginData
        }).catch((e) => setError(errorHandler(e)));
        res.data.isAdmin && dispatch(loginSuccess(res.data));
    } catch (error) {
        dispatch(loginFailure());
    }
};

const logout = async (dispatch) => {
    localStorage.setItem('user', null);
    dispatch(logoutUser());
};

export { login, logout };
