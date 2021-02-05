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
    USER_FETCH_REQUESTED,
    UsersActionTypes,

} from "../reducers/typesUsers";

export const fetchStart = (): UsersActionTypes => ({
    type: FETCH_START
});

export const fetchFail = (error: string): UsersActionTypes => ({
    type: FETCH_FAIL,
    payload: error
})

export const errorClear = () => ({
    type: ERROR_CLEAR
});

export const fetchUsersSuccess = (users: Array<object>, total: number): UsersActionTypes => ({
    type: FETCH_USERS_SUCCESS,
    payload: users,
    count: total
})

export const fetchUserSuccess = (user: { dateOfBirth: string }): UsersActionTypes => ({
    type: FETCH_USER_SUCCESS,
    payload: user,
});

export const deleteUser = (id: string): UsersActionTypes => ({
    type: DELETE_USER,
    payload: id,
});

export const onEditUser = (user: { firstName: string; lastName: string; dateOfBirth: string; id: string; age: number; email: string }, toast: any): UsersActionTypes => ({
    type: EDIT_USER,
    payload: {
        user,
        toast
    },
});

export const followAndUnfollow = (users: Array<object>, id: string): UsersActionTypes => ({
    type: FOLLOW_AND_UNFOLLOW,
    payload: {
        users,
        id
    }
});

export const usersFetchRequested = (
    token: string | undefined,
    page: number | undefined
): UsersActionTypes => ({
    type: USERS_FETCH_REQUESTED,
    payload: {
        page,
        token
    }
});

export const userFetchRequested = (token: string | undefined, id: string | string[] | undefined): UsersActionTypes => ({
    type: USER_FETCH_REQUESTED,
    payload: {
        id,
        token
    }
});



