export interface UserState {
    userId: string
    token: string,
    loader: boolean,
    error: string,
}

export const FETCH_USER_START = "FETCH_USER_START"
export const SET_USER = "SET_USER"
export const LOGOUT = "LOGOUT"
export const SING_IN = "SING_IN"

interface FetchUserStartUserAction {
    type: typeof FETCH_USER_START
}
interface UserUserUserAction {
    type: typeof SET_USER
    payload : {
        userId: string
        token: string
    }
}
interface LogOutUserAction {
    type: typeof LOGOUT
    payload : {
        userId: string
        token: string
    }
}
interface SingUserAction {
    type: typeof SING_IN
    payload : {
        username: string
        password: string
    }
}

export type UserActionTypes = FetchUserStartUserAction |
    UserUserUserAction |
    LogOutUserAction |
    SingUserAction
