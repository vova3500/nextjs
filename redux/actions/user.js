import {
    SET_USER,
    LOGOUT,
    SING_IN,
    FETCH_USER_START
} from "../reducers/user";

export const fetchStartUser = () => ({
    type: FETCH_USER_START
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


export const singIn = (username, password) => ({
    type: SING_IN,
    payload : {
        username,
        password
    }
})
