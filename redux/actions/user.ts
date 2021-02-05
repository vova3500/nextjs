import {
    SET_USER,
    LOGOUT,
    SING_IN,
    FETCH_USER_START
} from "../reducers/typesUser";

export const fetchStartUser = () => ({
    type: FETCH_USER_START
});

export const fetchSignInSuccess = (userId: string, token: string) => ({
    type: SET_USER,
    payload: {
        userId,
        token
    }
});

export const logOut = () => ({
    type: LOGOUT,
});


export const singIn = (username: string, password: string) => ({
    type: SING_IN,
    payload : {
        username,
        password
    }
})
