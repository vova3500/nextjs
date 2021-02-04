import {calcDate, getCurrentAge} from "../../utils/helpers"

export const DELETE_USER = "DELETE_USER";
export const EDIT_USER = "EDIT_USER";
export const FOLLOW_AND_UNFOLLOW = "FOLLOW_AND_UNFOLLOW";

export const FETCH_START = "FETCH_START";
export const FETCH_FAIL = "FETCH_FAIL";

export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";

export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";

export const ERROR_CLEAR = "ERROR_CLEAR";



const initialState = {
    items: [],
    count: 0,
    activeUser: {},
    loading: false,
    error: ""
};

const users = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_START: {
            return {
                ...state,
                loading: true
            }
        }
        case FETCH_USERS_SUCCESS: {
            const newUsers = [...action.payload].map((item) => ({...item, follow: []}))
            return {
                ...state,
                items: newUsers,
                count: action.count,
                loading: false
            };
        }
        case FETCH_FAIL: {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        }
        case FETCH_USER_SUCCESS: {
            let age = getCurrentAge(action.payload.dateOfBirth)

            return {
                ...state,
                activeUser: {...action.payload, age},
                loading: false
            };
        }

        case DELETE_USER: {
            const newUsers = [...state.items].filter((item) => action.payload !== item.id)
            return {
                ...state,
                items: newUsers,
            };
        }

        case EDIT_USER: {
            const newUsers = [...state.items].map((item) => {
                if (item.id === action.payload.id) {
                    return {
                        ...item,
                        firstName: action.payload.firstName,
                        lastName: action.payload.lastName,
                        email: action.payload.email
                    }
                }
                return item
            })

            const newDate = calcDate(action.payload.age, action.payload.dateOfBirth)
            const newActiveUser = {...state.activeUser, ...action.payload, dateOfBirth: newDate}

            action.toast()

            return {
                ...state,
                items: newUsers,
                activeUser: newActiveUser
            };
        }

        case FOLLOW_AND_UNFOLLOW: {
            const activeUser = [...state.items].filter((item) => item.id === action.id)

            activeUser[0].follow = JSON.parse(JSON.stringify(action.users))

            const newUsers = [...state.items].map((user) => {
                if (user.id === action.id) {

                  user = activeUser[0]
                }
                return user
            })

            return {
                ...state,
                items: newUsers
            }
        }

        case ERROR_CLEAR: {
            return {
                ...state,
                error: ""
            }
        }

        default: {
            return state;
        }
    }
}
export default users