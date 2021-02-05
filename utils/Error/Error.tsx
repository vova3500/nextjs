import React from "react";
// @ts-ignore
import Cookies from 'js-cookie'
import {useDispatch} from "react-redux";

import {logOut} from "../../redux/actions/user";
import {errorClear} from "../../redux/actions/users";
import Redirect from "../Redirect/Redirect";

interface TypeError{
    children: any
    error: string
}

const Error = ({children, error}: TypeError) => {
    const dispatch = useDispatch()
    switch (error) {
        case "Request failed with status code 403" :{
            Cookies.remove('token')
            dispatch(errorClear())
            dispatch(logOut())
            return <Redirect to="/login"/>
        }
        case "" :{
            return children
        }
        default :{
            return <div>{error}</div>
        }
    }
}

export default  Error