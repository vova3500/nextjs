// @ts-ignore
import Cookies from 'js-cookie'

import {
    FETCH_USER_START,
    SET_USER,
    LOGOUT,
    UserActionTypes,
    UserState
} from "./typesUser"


const initialState: UserState = {
    userId: "",
    token: ((!(typeof window === "undefined") && Cookies.get('token'))|| ""),
    loader: false,
    error: ""
};

const user = (state = initialState, action: UserActionTypes) => {
    switch (action.type) {

        case FETCH_USER_START: {
            return {
                ...state,
                loader: true,
            };
        }
        case SET_USER: {
            return {
                ...state,
                userId: action.payload.userId,
                token: action.payload.token,
                loader: false,
            };
        }

        case LOGOUT: {
            return {
                ...state,
                userId: "",
                token: "",
            };
        }

        default: {
            return state;
        }
    }
};

export default user;