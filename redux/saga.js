import {call, put, takeEvery} from 'redux-saga/effects'
import Cookies from 'js-cookie'

import {userAPI, usersAPI} from "../pages/api";

import {fetchFail, fetchStart, fetchUsersSuccess, fetchUserSuccess} from "./actions/users";
import {fetchSignInSuccess, fetchStartUser} from "./actions/user";

import {USER_FETCH_REQUESTED, USERS_FETCH_REQUESTED} from "./reducers/users";
import {SING_IN} from "./reducers/user";

function* fetchUsers(action) {
    yield put(fetchStart())
    try {
        const response = yield call(() => usersAPI.getUsers(action.page,action.token));
        yield put(fetchUsersSuccess(response.data.data, response.data.total))
    } catch (e) {
        yield put(fetchFail(e.message))
    }
}

function* singIn({payload}) {
    yield put(fetchStartUser())

    try {
        const response = yield call(() => userAPI.singIn(payload.username, payload.password));
        Cookies.set('token', response.data.token)
        yield put(fetchSignInSuccess(response.data.userId, response.data.token))
    } catch (e) {
        yield put(fetchFail(e.message))
    }
}

function* fetchUser(action) {
    yield put(fetchStart())

    try {
        const response = yield call(() => usersAPI.getUserFullProfile(action.id,action.token));
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
