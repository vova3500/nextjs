import Cookies from 'js-cookie'
export const FETCH_USER_START = "FETCH_USER_START"

export const SET_USER = "SET_USER"

export const LOGOUT = "LOGOUT"
export const SING_IN = "SING_IN"

const initialState = {
    userId: "",
    token: ((!(typeof window === "undefined") && Cookies.get('token'))|| ""),
    loader: false,
    error: ""

};

const user = (state = initialState, action) => {
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