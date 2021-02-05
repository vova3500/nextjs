import {TypeUser} from "./typesUsers";

export interface AppState {
    users: {
        items: Array<TypeUser>
        count: number
        loading: boolean
        activeUser: TypeUser
        error: string

    }
    user: {
        id: string
        token: string
        loader: boolean
        error: string
    }
}