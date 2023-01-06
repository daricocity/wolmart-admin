import PropTypes from 'prop-types';
import UsersReducers from './UserReducers';
import { createContext, useReducer } from 'react';

const INITIAL_STATE = {
    users: [],
    isFetching: false,
    error: false
};

const UserContext = createContext(INITIAL_STATE);

const UserContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(UsersReducers, INITIAL_STATE);

    return (
        <UserContext.Provider
            value={{
                users: state.users,
                isFetching: state.isFetching,
                error: state.error,
                dispatch
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

UserContextProvider.propTypes = {
    children: PropTypes.node
};

export { UserContext, UserContextProvider };
