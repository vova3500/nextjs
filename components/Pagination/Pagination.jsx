import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {usersFetchRequested} from "../../redux/actions/users"

import Pagination from '@material-ui/lab/Pagination';

const PaginationUsers = () => {
    const dispatch =  useDispatch()

    const [page, setPage] = React.useState(1 );
    const countUsers = useSelector(({users}) => users.count)
    const countPages = Math.ceil(countUsers/20)

    const handleChange = (event, value) => {
        setPage(value)
        dispatch(usersFetchRequested(value - 1))
    };

    return (
        <Pagination count={countPages} page={page} onChange={handleChange} />
    )
}

export default PaginationUsers