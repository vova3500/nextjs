import React from "react";
import Cookies from 'js-cookie'
import {useDispatch} from "react-redux";

import {logOut} from "../../redux/actions/user";
import {errorClear} from "../../redux/actions/users";
import Redirect from "../Redirect/Redirect";

const Error = ({children, error}) => {
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