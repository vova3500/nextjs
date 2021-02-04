import {useSelector} from "react-redux";

import Redirect from "../utils/Redirect/Redirect";

const HomePage = () => {

    const token = useSelector(({user}) => user.token)
    return <>
        {token ? <Redirect to="/users"/> : <Redirect to="/login"/>}
    </>
}

export default HomePage
