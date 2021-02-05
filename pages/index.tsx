import React from "react";
import {useSelector} from "react-redux";

import Redirect from "../utils/Redirect/Redirect";

interface TypeHomePage{
    user:{
        token: string
    }
}

const HomePage = () => {
    const token = useSelector(({user}:TypeHomePage) => user.token)
    return <>
        {token ? <Redirect to="/users"/> : <Redirect to="/login"/>}
    </>
}

export default HomePage
