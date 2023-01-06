import PropTypes from 'prop-types';
import AuthReducers from './AuthReducers';
import { createContext, useEffect, useReducer } from 'react';

const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    isFetching: false,
    error: false
};

const AuthContext = createContext(INITIAL_STATE);

const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducers, INITIAL_STATE);
    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(state.user));
    }, [state.user]);
    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                isFetching: state.isFetching,
                error: state.error,
                dispatch
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

AuthContextProvider.propTypes = {
    children: PropTypes.node
};

export { AuthContext, AuthContextProvider };
