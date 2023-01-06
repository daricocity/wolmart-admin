import PropTypes from 'prop-types';
import ProductsReducers from './ProductReducers';
import { createContext, useReducer } from 'react';

const INITIAL_STATE = {
    products: [],
    isFetching: false,
    error: false
};

const ProductContext = createContext(INITIAL_STATE);

const ProductContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(ProductsReducers, INITIAL_STATE);
    return (
        <ProductContext.Provider
            value={{
                products: state.products,
                isFetching: state.isFetching,
                error: state.error,
                dispatch
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};

ProductContextProvider.propTypes = {
    children: PropTypes.node
};

export { ProductContext, ProductContextProvider };
