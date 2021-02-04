import {userAPI} from "../../api";
import {
    FETCH_START,
    FETCH_FAIL,
    SET_USER,
    LOGOUT
} from "../reducers/user";

export const fetchStart = () => ({
    type: FETCH_START
});

export const fetchFail = (error) => ({
    type: FETCH_FAIL,
    payload: error
});

export const fetchSignInSuccess = (userId, token) => ({
    type: SET_USER,
    payload: {
        userId,
        token
    }
});

export const logOut = () => ({
    type: LOGOUT,
});

export const signIn = (Username, password) => async (dispatch) => {
    dispatch(fetchStart())

    try{
        let response = await userAPI.singIn(Username, password);
        localStorage.setItem('token', response.data.token)
        dispatch(fetchSignInSuccess(response.data.userId, response.data.token))
    }
    catch (e){
        dispatch(fetchFail(e.message))
    }
};
