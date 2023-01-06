// UPDATE USER ACTION
const updateUserStart = () => ({
    type: 'UPDATE_USER_START'
});

const updateUserSuccess = (User) => ({
    type: 'UPDATE_USER_SUCCESS',
    payload: User
});

const updateUserFailure = () => ({
    type: 'UPDATE_USER_FAILURE'
});

// DELETE USER ACTION
const deleteUserStart = () => ({
    type: 'DELETE_USER_START'
});

const deleteUserSuccess = (id) => ({
    type: 'DELETE_USER_SUCCESS',
    payload: id
});

const deleteUserFailure = () => ({
    type: 'DELETE_USER_FAILURE'
});

// GET USER ACTION
const getUsersStart = () => ({
    type: 'GET_USERS_START'
});

const getUsersSuccess = (users) => ({
    type: 'GET_USERS_SUCCESS',
    payload: users
});

const getUsersFailure = () => ({
    type: 'GET_USER_FAILURE'
});

export {
    getUsersStart,
    getUsersSuccess,
    getUsersFailure,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure,
    updateUserStart,
    updateUserSuccess,
    updateUserFailure
};
