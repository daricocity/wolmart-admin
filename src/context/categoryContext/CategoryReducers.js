const CategorysReducers = (state, action) => {
    switch (action.type) {
        // UPDATE
        case 'UPDATE_CATEGORY_START':
            return {
                ...state,
                isFetching: true,
                error: false
            };

        case 'UPDATE_CATEGORY_SUCCESS':
            return {
                categorys: state.categorys.map((category) => category._id === action.payload._id && action.payload),
                isFetching: false,
                error: false
            };

        case 'UPDATE_CATEGORY_FAILURE':
            return {
                ...state,
                isFetching: false,
                error: true
            };

        // DELETE
        case 'DELETE_CATEGORY_START':
            return {
                ...state,
                isFetching: true,
                error: false
            };

        case 'DELETE_CATEGORY_SUCCESS':
            return {
                categorys: state.categorys.filter((category) => category._id !== action.payload),
                isFetching: false,
                error: false
            };

        case 'DELETE_CATEGORY_FAILURE':
            return {
                ...state,
                isFetching: false,
                error: true
            };

        // GET
        case 'GET_CATEGORYS_START':
            return {
                categorys: [],
                isFetching: true,
                error: false
            };

        case 'GET_CATEGORYS_SUCCESS':
            return {
                categorys: action.payload,
                isFetching: false,
                error: false
            };

        case 'GET_MOVIES_FAILURE':
            return {
                categorys: [],
                isFetching: false,
                error: true
            };

        // CREATE
        case 'CREATE_CATEGORY_START':
            return {
                ...state,
                isFetching: true,
                error: false
            };

        case 'CREATE_CATEGORY_SUCCESS':
            return {
                categorys: [...state.categorys, action.payload],
                isFetching: false,
                error: false
            };

        case 'CREATE_CATEGORY_FAILURE':
            return {
                ...state,
                isFetching: false,
                error: true
            };

        default:
            return { ...state };
    }
};

export default CategorysReducers;
