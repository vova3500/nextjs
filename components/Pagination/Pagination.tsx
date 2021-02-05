import React from "react";
// @ts-ignore
import Cookies from 'js-cookie'
import {useDispatch, useSelector} from "react-redux";
import {usersFetchRequested} from "../../redux/actions/users"

import Pagination from '@material-ui/lab/Pagination';

interface TypePaginationUsersSelector {
    users: {
        count: number
    }
}

const PaginationUsers = () => {
    const dispatch =  useDispatch()

    const [page, setPage] = React.useState(1 );
    const countUsers = useSelector((state: TypePaginationUsersSelector) => state.users.count)
    const countPages = Math.ceil(countUsers/20)

    const handleChange = (_: any, value: number) => {
        const token = Cookies.get("token")
        setPage(value)
        dispatch(usersFetchRequested(token,value - 1))
    };

    return (
        <Pagination count={countPages} page={page} onChange={handleChange} />
    )
}
export default PaginationUsers