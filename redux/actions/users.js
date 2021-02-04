import {
    FETCH_FAIL,
    FETCH_START,

    FETCH_USERS_SUCCESS,
    FETCH_USER_SUCCESS,

    DELETE_USER,
    EDIT_USER,
    FOLLOW_AND_UNFOLLOW,
    ERROR_CLEAR,

    USERS_FETCH_REQUESTED,
    USER_FETCH_REQUESTED

} from "../reducers/users";

export const fetchStart = () => ({
    type: FETCH_START
});

export const fetchFail = (error) => ({
        type: FETCH_FAIL,
        payload: error
})

export const errorClear = () => ({
    type: ERROR_CLEAR
});

export const fetchUsersSuccess = (users, total) => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users,
        count: total
    };
}
export const fetchUserSuccess = (users, total) => ({
    type: FETCH_USER_SUCCESS,
    payload: users,
    count: total
});

export const deleteUser = (id) => ({
    type: DELETE_USER,
    payload: id,
});

export const onEditUser = (user, toast) => ({
    type: EDIT_USER,
    payload: user,
    toast
});

export const followAndUnfollow = (users, id) => ({
    type: FOLLOW_AND_UNFOLLOW,
    users: users,
    id: id
});

export const usersFetchRequested = (token, page) => ({
    type: USERS_FETCH_REQUESTED,
    page,
    token
});

export const userFetchRequested = (token,id) => ({
    type: USER_FETCH_REQUESTED,
    id,
    token
});



