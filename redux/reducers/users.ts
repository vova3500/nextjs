import {calcDate, getCurrentAge} from "../../utils/helpers"
import {HYDRATE} from 'next-redux-wrapper';

import {UsersState} from "./typesUsers";
import {
    FETCH_FAIL,
    FETCH_START,

    FETCH_USERS_SUCCESS,
    FETCH_USER_SUCCESS,

    DELETE_USER,
    EDIT_USER,
    FOLLOW_AND_UNFOLLOW,
    ERROR_CLEAR,
    UsersActionTypes

} from "./typesUsers";

const initialState: UsersState = {
    items: [],
    count: 0,
    activeUser: {},
    loading: false,
    error: ""
};

interface AppState {
    users: Array<object>
    user: object
}

const users = (state = initialState, action: UsersActionTypes | { type: typeof HYDRATE; payload: AppState }) => {
    switch (action.type) {
        case HYDRATE:
            return {...state, ...action.payload.users};
        case FETCH_USERS_SUCCESS: {
            const newUsers = [...action.payload].map((item) => ({...item, follow: []}))
            return {
                ...state,
                items: newUsers,
                count: action.count,
                loading: false
            };
        }
        case FETCH_START: {
            return {
                ...state,
                loading: true
            }
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
                if (item.id === action.payload.user.id) {
                    return {
                        ...item,
                        firstName: action.payload.user.firstName,
                        lastName: action.payload.user.lastName,
                        email: action.payload.user.email
                    }
                }
                return item
            })

            const newDate = calcDate(action.payload.user.age, action.payload.user.dateOfBirth)
            const newActiveUser = {...state.activeUser, ...action.payload.user, dateOfBirth: newDate}

            action.payload.toast()

            return {
                ...state,
                items: newUsers,
                activeUser: newActiveUser
            };
        }

        case FOLLOW_AND_UNFOLLOW: {
            const activeUser = [...state.items].filter((item) => item.id === action.payload.id)

            activeUser[0].follow = JSON.parse(JSON.stringify(action.payload.users))

            const newUsers = [...state.items].map((user) => {
                if (user.id === action.payload.id) {

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