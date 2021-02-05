export interface UsersState {
    items: Array<{
        id: string,
        follow: Array<object>
    }>
    count: number,
    activeUser: object,
    loading: boolean,
    error: string,
}

export interface TypeUser {
    id: string
    firstName: string
    lastName: string
    email: string
    age: number
    dateOfBirth: string
    follow: Array<object | []>
    picture: string
}

export const DELETE_USER = "DELETE_USER";
export const EDIT_USER = "EDIT_USER";
export const FOLLOW_AND_UNFOLLOW = "FOLLOW_AND_UNFOLLOW";
export const FETCH_START = "FETCH_START";
export const FETCH_FAIL = "FETCH_FAIL";
export const USERS_FETCH_REQUESTED = "USERS_FETCH_REQUESTED"
export const USER_FETCH_REQUESTED = "USER_FETCH_REQUESTED"
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const ERROR_CLEAR = "ERROR_CLEAR";

interface DeleteUserAction {
    type: typeof DELETE_USER
    payload: string
}

interface EditUserAction {
    type: typeof EDIT_USER
    payload: {
        user: { firstName: string; lastName: string; dateOfBirth: string; id: string; age: number; email: string }
        toast: any
    }
}

interface FollowAndUnfollowUserAction {
    type: typeof FOLLOW_AND_UNFOLLOW
    payload: {
        users: Array<object>
        id: string
    }
}

interface FetchStartUserAction {
    type: typeof FETCH_START
}

interface FetchFailUserAction {
    type: typeof FETCH_FAIL
    payload: string
}

interface UsersFetchRequestedUserAction {
    type: typeof USERS_FETCH_REQUESTED
    payload: {
        token: string | undefined, page: number | undefined
    }
}

interface UserFetchRequestedUserAction {
    type: typeof USER_FETCH_REQUESTED
    payload: {
        token: string | undefined, id: string | string[] | undefined
    }
}

interface FetchUserUserAction {
    type: typeof FETCH_USER_SUCCESS
    payload: { dateOfBirth: string }
}

interface FetchUsersUserAction {
    type: typeof FETCH_USERS_SUCCESS
    payload: Array<object>
    count: number
}

interface ErrorClearUserAction {
    type: typeof ERROR_CLEAR
    payload: Array<object>
    count: number
}

export type UsersActionTypes = DeleteUserAction |
    EditUserAction |
    FollowAndUnfollowUserAction |
    FetchStartUserAction |
    FetchFailUserAction |
    UsersFetchRequestedUserAction |
    UserFetchRequestedUserAction |
    FetchUserUserAction |
    FetchUsersUserAction |
    ErrorClearUserAction

