import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useForm, Controller} from "react-hook-form";
import Link from 'next/link';
// @ts-ignore
import Toastify from 'toastify-js'
import cookies from "next-cookies";
import {END} from "redux-saga";

import wrapper from "../../redux/store";
import {errorClear, onEditUser, userFetchRequested} from "../../redux/actions/users"

import Error from "../../utils/Error/Error";
import Input from "../../utils/Input/Input";
import {calcDate, getCurrentAge} from "../../utils/helpers";

import {TypeUser} from "../../redux/reducers/typesUsers";

import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Avatar from "@material-ui/core/Avatar";
import Button from '@material-ui/core/Button';
import LoadingEditUser from "../../components/Loaders/LoadingEditUser";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import TextField from "@material-ui/core/TextField";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
    root: {
        width: "100%",
        marginTop: 50,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    avatar: {
        width: 150,
        height: 150
    },
    form: {
        height: "15%",
        width: "40%",
        marginTop: 50,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        flexWrap: "wrap"
    },
    input: {
        marginBottom: 10
    },
    toast: {
        width: 400,
        color: "white",
        position: "absolute",
        right: 20,
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 25,
        paddingRight: 25,
        borderRadius: 5,
    }
});

interface TypeEditUsers {
    activeUser: TypeUser
    loading: boolean
}

interface TypeEditUsersSelector {
    users: {
        error: string
    }
}

const EditUsers = ({activeUser, loading}: TypeEditUsers) => {
    const classes = useStyles();
    const {handleSubmit, register, control, setValue} = useForm();

    const dispatch = useDispatch();

    const error = useSelector((state: TypeEditUsersSelector) => state.users.error)

    let myDate = activeUser.dateOfBirth ? activeUser.dateOfBirth.slice(0, 10) : 0

    // @ts-ignore
    useEffect(() => {
        return dispatch(errorClear())
    }, [dispatch])

    const toast = () => {
        Toastify({
            className: classes.toast,
            text: "Changes are successful",
            duration: 1000,
            newWindow: true,
            gravity: "bottom",
            position: "left",
            backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
            stopOnFocus: true,
        }).showToast();
    }

    const onSubmit = (data: TypeUser) => {
        const newUsers: {
            firstName: string;
            lastName: string;
            dateOfBirth: string;
            id: string; age: number;
            email: string
        } = {
            age: data.age,
            id: data.id,
            dateOfBirth: data.dateOfBirth,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName
        }
        dispatch(onEditUser(newUsers, toast))
    };

    const handleChangeDateOfBirth = (e: any) => {
        const newAge = getCurrentAge(e.target.value)

        setValue("dateOfBirth", e.target.value);
        setValue("age", newAge);
    }
    const handleChangeAge = (value: number) => {
        const newDate = calcDate(value, activeUser.dateOfBirth)

        setValue("age", value);
        setValue("dateOfBirth", newDate)
    }

    React.useEffect(() => {
        register("dateOfBirth");
        register("age");
    }, [register])

    return (
        <LoadingEditUser loading={loading}>
            <Container className={classes.root}>
                <Container>
                    <Link href="/">
                        <IconButton color="primary" aria-label="upload picture" component="span">
                            <ArrowBackIcon fontSize="large" color="primary"/>
                        </IconButton>
                    </Link>
                </Container>
                <Error error={error}>
                    <Avatar className={classes.avatar} alt="Remy Sharp" src={activeUser.picture}/>
                    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                        <Input
                            className={classes.input}
                            inputRef={register}
                            name="firstName"
                            defaultValue={activeUser.firstName}
                            type="text"
                        />
                        <Input
                            className={classes.input}
                            inputRef={register}
                            name="lastName"
                            defaultValue={activeUser.lastName}
                            type="text"
                        />
                        <Input
                            className={classes.input}
                            inputRef={register}
                            name="email"
                            defaultValue={activeUser.email}
                            type="email"
                        />
                        <TextField
                            className={classes.input}
                            defaultValue={myDate}
                            inputRef={register}
                            label="DateOfBirth"
                            name="dateOfBirth"
                            type="date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={handleChangeDateOfBirth}
                        />
                        <Controller
                            name="age"
                            control={control}
                            defaultValue={activeUser.age || 0}
                            render={({value}) => <div>
                                <Typography id="discrete-slider" gutterBottom>
                                    Age
                                </Typography>
                                <Slider
                                    // @ts-ignore
                                    onChange={(_, value: number) => {
                                        handleChangeAge(value)
                                    }}
                                    value={value || 0}
                                    valueLabelDisplay="auto"
                                    step={1}
                                    min={1}
                                    max={110}
                                />
                            </div>}
                        />
                        <Button type="submit" variant="contained" color="primary">
                            Submit
                        </Button>
                    </form>
                </Error>
            </Container>
        </LoadingEditUser>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(
    async (ctx) => {
        const allCookie = cookies(ctx)
        await ctx.store.dispatch(userFetchRequested(allCookie.token, ctx.query.id))
        ctx.store.dispatch(END)
        await ctx.store.sagaTask?.toPromise()
        const state = ctx.store.getState()
        if (state.users.activeUser.id) {
            return {
                props: {
                    activeUser: state.users.activeUser,
                    loading: state.users.loading
                }
            }
        }

        return {
            notFound: true
        }
    }
)

export default EditUsers