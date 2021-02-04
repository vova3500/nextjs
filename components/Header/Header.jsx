import React from "react";
import Cookies from 'js-cookie'
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";

import {logOut} from "../../redux/actions/user";

import {makeStyles} from "@material-ui/core/styles";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";


const useStyles = makeStyles({
    root:{
        width: "90%"
    },
    toolbar: {
        display:"flex",
        justifyContent: "space-between"
    },
});

const Header = () => {
    const classes = useStyles()

    const router = useRouter();

    const dispatch = useDispatch()

    const token = useSelector(({user}) => user.token)

    const onLogout = () => {
        Cookies.remove('token')
        dispatch(logOut())
        router.push("/login")
    }

    return (
        <AppBar position="static">
            <Toolbar className={classes.toolbar} variant="dense">
                <Title title="Header"/>
                {
                    token && <Button onClick={onLogout} color="inherit">LOGOUT</Button>
                }
            </Toolbar>
        </AppBar>
    )
}

function Title({title}) {
    return (
        <Typography variant="h6" color="inherit">
            {title}
        </Typography>
    )
}

export default Header