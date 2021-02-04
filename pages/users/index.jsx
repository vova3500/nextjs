import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {END} from 'redux-saga'
import cookies from 'next-cookies'

import {errorClear, usersFetchRequested} from "../../redux/actions/users";
import wrapper from "../../redux/store";

import Pagination from "../../components/Pagination/Pagination";
import SkeletonUser from "../../components/Loaders/SkeletonUser";
import User from "../../components/user";
import Error from "../../utils/Error/Error";

import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

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

const Index = ({users}) => {
    const classes = useStyles();

    const dispatch = useDispatch()
    const loading = useSelector(({users}) => users.loading)
    const error = useSelector(({users}) => users.error)

    useEffect(() => {
        return dispatch(errorClear())
    }, [dispatch])

    return (
        <Container className={classes.root}>
            <Container className={classes.users}>
                <SkeletonUser loading={loading}>
                    <Error error={error}>
                        {
                            users.map((user) => (
                                <User
                                    key={user.id}
                                    id={user.id}
                                    firstName={user.firstName}
                                    lastName={user.lastName}
                                    email={user.email}
                                    picture={user.picture}
                                    isFollow={user.isFollow}
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
        await ctx.store.dispatch(usersFetchRequested(allCookie.token, ctx.query.id))
        ctx.store.dispatch(END)
        await ctx.store.sagaTask.toPromise()

        const state = ctx.store.getState()

        return {
            props:{ users: state.users.items}
        }
    }
);

export default Index