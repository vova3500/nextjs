import {TypeUser} from "./typesUsers";

export interface AppState {
    users: {
        items: Array<TypeUser>
        loading: boolean
        activeUser: {
            id: string | undefined
        }
    }
    user: {
        id: string | undefined
    }
}