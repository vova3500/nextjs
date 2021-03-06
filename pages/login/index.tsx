import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {useRouter} from 'next/router'

import {singIn} from "../../redux/actions/user";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    error: {
        marginTop: 10,
        display:"flex",
        justifyContent:"center",
        color: "red"
    }
}));

interface TypeFormData {
    Username: string
    password: string
}

interface TypeLoginSelector {
    user: {
        token: string
    }
    users: {
        error: string
    }
}

const Login = () => {
    const router = useRouter()
    const { register, handleSubmit} = useForm();
    const classes = useStyles();

    const dispatch = useDispatch();

    const onSubmit = (data: TypeFormData) => {
        dispatch(singIn(data.Username, data.password))
    };

    const error = useSelector((state: TypeLoginSelector) => state.users.error)
    const token = useSelector((state: TypeLoginSelector) => state.user.token)
    if (token) {
        if (typeof window !== 'undefined'){
            router.push("/users")
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit(onSubmit)} >
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        inputRef={register}
                        fullWidth
                        label="Username"
                        name="Username"
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        inputRef={register}
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                    />
                    {
                       ( error === "Request failed with status code 401") &&
                       <div className={classes.error}>
                           Incorrect password and login *
                       </div>
                    }
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}

export default Login