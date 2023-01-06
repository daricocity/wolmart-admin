// UPDATE PRODUCT ACTION
const updateProductStart = () => ({
    type: 'UPDATE_PRODUCT_START'
});

const updateProductSuccess = (product) => ({
    type: 'UPDATE_PRODUCT_SUCCESS',
    payload: product
});

const updateProductFailure = () => ({
    type: 'UPDATE_PRODUCT_FAILURE'
});

// DELETE PRODUCT ACTION
const deleteProductStart = () => ({
    type: 'DELETE_PRODUCT_START'
});

const deleteProductSuccess = (id) => ({
    type: 'DELETE_PRODUCT_SUCCESS',
    payload: id
});

const deleteProductFailure = () => ({
    type: 'DELETE_PRODUCT_FAILURE'
});

// GET PRODUCT ACTION
const getProductsStart = () => ({
    type: 'GET_PRODUCTS_START'
});

const getProductsSuccess = (products) => ({
    type: 'GET_PRODUCTS_SUCCESS',
    payload: products
});

const getProductsFailure = () => ({
    type: 'GET_PRODUCTS_FAILURE'
});

// CREATE PRODUCT ACTION
const createProductStart = () => ({
    type: 'CREATE_PRODUCT_START'
});

const createProductSuccess = (product) => ({
    type: 'CREATE_PRODUCT_SUCCESS',
    payload: product
});

const createProductFailure = () => ({
    type: 'CREATE_PRODUCT_FAILURE'
});

export {
    getProductsStart,
    getProductsSuccess,
    getProductsFailure,
    deleteProductStart,
    deleteProductSuccess,
    deleteProductFailure,
    createProductStart,
    createProductSuccess,
    createProductFailure,
    updateProductStart,
    updateProductSuccess,
    updateProductFailure
};
