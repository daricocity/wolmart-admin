const CartReducers = (state, action) => {
    switch (action.type) {
        // DELETE
        case 'DELETE_CART_START':
            return {
                ...state,
                isFetching: true,
                error: false
            };

        case 'DELETE_CART_SUCCESS':
            return {
                cart: state.cart.filter((car) => car._id !== action.payload),
                isFetching: false,
                error: false
            };

        case 'DELETE_CART_FAILURE':
            return {
                ...state,
                isFetching: false,
                error: true
            };

        // GET
        case 'GET_CARTS_START':
            return {
                carts: [],
                isFetching: true,
                error: false
            };

        case 'GET_CARTS_SUCCESS':
            return {
                carts: action.payload,
                isFetching: false,
                error: false
            };

        case 'GET_CARTS_FAILURE':
            return {
                carts: [],
                isFetching: false,
                error: true
            };

        default:
            return { ...state };
    }
};

export default CartReducers;
