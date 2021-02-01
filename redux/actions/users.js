import { usersAPI } from "../../api";
import {
    FETCH_FAIL,
    FETCH_START,

    FETCH_USERS_SUCCESS,
    FETCH_USER_SUCCESS,

    DELETE_USER,
    EDIT_USER,
    FOLLOW_AND_UNFOLLOW,
    ERROR_CLEAR
} from "../reducers/users";

export const fetchStart = () => ({
    type: FETCH_START
});

export const fetchFail = (error) => ({
    type: FETCH_FAIL,
    payload: error
});

export const errorClear = () => ({
    type: ERROR_CLEAR
});

export const fetchUsersSuccess = (users, total) => ({
    type: FETCH_USERS_SUCCESS,
    payload: users,
    count: total
});
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

export const followAndUnfollow = (users,id) => ({
    type: FOLLOW_AND_UNFOLLOW,
    users: users,
    id: id
});

export const loadingUsers = (page) => async (dispatch) => {
    dispatch(fetchStart())

    try{
        let response = await usersAPI.getUsers(page);
        dispatch(fetchUsersSuccess(response.data.data,response.data.total))
    }
    catch (e){
        dispatch(fetchFail(e.message))
    }
};

export const loadingFullInfoUser = (id) => async (dispatch) => {
    dispatch(fetchStart())

    try{
        let response = await usersAPI.getUserFullProfile(id);
        dispatch(fetchUserSuccess(response.data))
    }
    catch (e){
        dispatch(fetchFail(e.message))
    }
};


