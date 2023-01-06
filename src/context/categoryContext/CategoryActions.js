// UPDATE CATEGORY ACTION
const updateCategoryStart = () => ({
    type: 'UPDATE_CATEGORY_START'
});

const updateCategorySuccess = (category) => ({
    type: 'UPDATE_CATEGORY_SUCCESS',
    payload: category
});

const updateCategoryFailure = () => ({
    type: 'UPDATE_CATEGORY_FAILURE'
});

// DELETE CATEGORY ACTION
const deleteCategoryStart = () => ({
    type: 'DELETE_CATEGORY_START'
});

const deleteCategorySuccess = (id) => ({
    type: 'DELETE_CATEGORY_SUCCESS',
    payload: id
});

const deleteCategoryFailure = () => ({
    type: 'DELETE_CATEGORY_FAILURE'
});

// GET CATEGORYS ACTION
const getCategorysStart = () => ({
    type: 'GET_CATEGORYS_START'
});

const getCategorysSuccess = (categorys) => ({
    type: 'GET_CATEGORYS_SUCCESS',
    payload: categorys
});

const getCategorysFailure = () => ({
    type: 'GET_CATEGORYS_FAILURE'
});

// CREATE CATEGORY ACTION
const createCategoryStart = () => ({
    type: 'CREATE_CATEGORY_START'
});

const createCategorySuccess = (category) => ({
    type: 'CREATE_CATEGORY_SUCCESS',
    payload: category
});

const createCategoryFailure = () => ({
    type: 'CREATE_CATEGORY_FAILURE'
});

export {
    getCategorysStart,
    getCategorysSuccess,
    getCategorysFailure,
    deleteCategoryStart,
    deleteCategorySuccess,
    deleteCategoryFailure,
    createCategoryStart,
    createCategorySuccess,
    createCategoryFailure,
    updateCategoryStart,
    updateCategorySuccess,
    updateCategoryFailure
};
