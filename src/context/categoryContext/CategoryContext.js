import PropTypes from 'prop-types';
import CategorysReducers from './CategoryReducers';
import { createContext, useReducer } from 'react';

const INITIAL_STATE = {
    categorys: [],
    isFetching: false,
    error: false
};

const CategoryContext = createContext(INITIAL_STATE);

const CategoryContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(CategorysReducers, INITIAL_STATE);

    return (
        <CategoryContext.Provider
            value={{
                categorys: state.categorys,
                isFetching: state.isFetching,
                error: state.error,
                dispatch
            }}
        >
            {children}
        </CategoryContext.Provider>
    );
};

CategoryContextProvider.propTypes = {
    children: PropTypes.node
};

export { CategoryContext, CategoryContextProvider };
