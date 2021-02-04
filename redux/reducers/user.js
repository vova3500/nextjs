export const FETCH_START = "FETCH_START"
export const FETCH_FAIL = "FETCH_FAIL"

export const SET_USER = "SET_USER"
export const LOGOUT = "LOGOUT"

const initialState = {
    userId: "",
    token: "",
    loader: false,
    error: ""
};

const user = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_START: {
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
            };
        }
        case FETCH_FAIL: {
            return {
                ...state,
                loader: false,
                error: action.payload,
            };
        }
        case LOGOUT: {
            return {
                ...state,
                token: "",
            };
        }

        default: {
            return state;
        }
    }
};

export default user;