// DELETE CART ACTION
const deleteCartStart = () => ({
    type: 'DELETE_CART_START'
});

const deleteCartSuccess = (id) => ({
    type: 'DELETE_CART_SUCCESS',
    payload: id
});

const deleteCartFailure = () => ({
    type: 'DELETE_CART_FAILURE'
});

// GET CART ACTION
const getCartsStart = () => ({
    type: 'GET_CARTS_START'
});

const getCartsSuccess = (carts) => ({
    type: 'GET_CARTS_SUCCESS',
    payload: carts
});

const getCartsFailure = () => ({
    type: 'GET_CARTS_FAILURE'
});

export { getCartsStart, getCartsSuccess, getCartsFailure, deleteCartStart, deleteCartSuccess, deleteCartFailure };
