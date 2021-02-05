import React, {useEffect} from "react";
import {connect, useDispatch, useSelector} from "react-redux";
import cookies from 'next-cookies'
import {END} from 'redux-saga';

import {errorClear, usersFetchRequested} from "../../redux/actions/users";
import wrapper from "../../redux/store";

import Pagination from "../../components/Pagination/Pagination";
import SkeletonUser from "../../components/Loaders/SkeletonUser";
import User from "../../components/user";
import Error from "../../utils/Error/Error";

import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {AppState} from "../../redux/reducers/typeStore";

const useStyles = makeStyles({
    root: {
        width: "100%",
        flexDirection: "column"
    },
    users: {
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap"
    },
    pagination: {
        display: "flex",
        justifyContent: "center",
        paddingTop: 20,
        paddingBottom: 20
    }
});

interface TypeUsersProps {
    users: Array<{
        id: string
        firstName: string
        lastName: string
        email: string
        picture: string
        follow: []
    }>
}

interface TypeUsersSelector {
    users: {
        loading: boolean
        error: string
    }
}

const Index = (props: TypeUsersProps) => {
    const classes = useStyles();

    const dispatch = useDispatch()
    const loading = useSelector((state: TypeUsersSelector) => state.users.loading)
    const error = useSelector((state: TypeUsersSelector) => state.users.error)

    // @ts-ignore
    useEffect(() => {
        return dispatch(errorClear())
    }, [dispatch])

    return (
        <Container className={classes.root}>
            <Container className={classes.users}>
                <SkeletonUser loading={loading}>
                    <Error error={error}>
                        {
                            props.users.map((user) => (
                                <User
                                    key={user.id}
                                    id={user.id}
                                    firstName={user.firstName}
                                    lastName={user.lastName}
                                    email={user.email}
                                    picture={user.picture}
                                />))
                        }
                    </Error>
                </SkeletonUser>
                <Container className={classes.pagination}>
                    <Pagination/>
                </Container>
            </Container>
        </Container>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(
    async (ctx) => {
        const allCookie = cookies(ctx)
        await ctx.store.dispatch(usersFetchRequested(allCookie.token, 0))
        ctx.store.dispatch(END)
        await ctx.store.sagaTask?.toPromise()

        const state = ctx.store.getState()
        return {
            props: {users: state.users.items}
        }
    }
);


function mapStateToProps(state: AppState) {
    return ({users: state.users.items})
}

// @ts-ignore
export default connect(mapStateToProps)(Index)