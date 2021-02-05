import { combineReducers } from "redux";

import users from "./users";
import user from "./user";

const rootReduser = combineReducers({
    users,
    user
});

export type RootState = ReturnType<typeof rootReduser>

export default rootReduser;