import {call, put, takeEvery} from 'redux-saga/effects'
// @ts-ignore
import Cookies from 'js-cookie'

import {userAPI, usersAPI} from "../pages/api";

import {fetchFail, fetchStart, fetchUsersSuccess, fetchUserSuccess} from "./actions/users";
import {fetchSignInSuccess, fetchStartUser} from "./actions/user";

import {USER_FETCH_REQUESTED, USERS_FETCH_REQUESTED} from "./reducers/typesUsers";
import {SING_IN} from "./reducers/typesUser";


function* fetchUsers(action: typesFetchUsers) {
    yield put(fetchStart())
    try {
        const response = yield call(() => usersAPI.getUsers(action.payload.page, action.payload.token));
        yield put(fetchUsersSuccess(response.data.data, response.data.total))
    } catch (e) {
        yield put(fetchFail(e.message))
    }
}

function* singIn(action: typesSingIn) {
    yield put(fetchStartUser())

    try {
        const response = yield call(() => userAPI.singIn(action.payload.username, action.payload.password));
        Cookies.set('token', response.data.token)
        yield put(fetchSignInSuccess(response.data.userId, response.data.token))
    } catch (e) {
        yield put(fetchFail(e.message))
    }
}

function* fetchUser(action: typesFetchUser) {
    yield put(fetchStart())

    try {
        const response = yield call(() => usersAPI.getUserFullProfile(action.payload.id, action.payload.token));
        yield put(fetchUserSuccess(response.data))
    } catch (e) {
        yield put(fetchFail(e.message))
    }
}

function* mySaga() {
    yield takeEvery(USERS_FETCH_REQUESTED, fetchUsers)
    yield takeEvery(SING_IN, singIn)
    yield takeEvery(USER_FETCH_REQUESTED, fetchUser)
}

export default mySaga;

interface typesFetchUsers {
    type: typeof USERS_FETCH_REQUESTED
    payload: {
        page: number
        token: string
    }
}
interface typesSingIn {
    type: typeof SING_IN
    payload: {
        username: string
        password: string
    }
}
interface typesFetchUser {
    type: typeof USER_FETCH_REQUESTED
    payload: {
        id: string
        token: string
    }
}