import PropTypes from 'prop-types';
import CartReducers from './CartReducers';
import { createContext, useReducer } from 'react';

const INITIAL_STATE = {
    carts: [],
    isFetching: false,
    error: false
};

const CartContext = createContext(INITIAL_STATE);

const CartContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(CartReducers, INITIAL_STATE);
    return (
        <CartContext.Provider
            value={{
                carts: state.carts,
                isFetching: state.isFetching,
                error: state.error,
                dispatch
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

CartContextProvider.propTypes = {
    children: PropTypes.node
};

export { CartContext, CartContextProvider };
