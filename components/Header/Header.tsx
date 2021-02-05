import React from "react";
// @ts-ignore
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
    root: {
        width: "90%"
    },
    toolbar: {
        display: "flex",
        justifyContent: "space-between"
    },
});

interface TypeHeaderSelector {
    user: {
        token: string
    }
}

const Header = () => {
    const classes = useStyles()

    const router = useRouter();

    const dispatch = useDispatch()

    const token = useSelector((state: TypeHeaderSelector) => state.user.token)

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

interface TypeTitleProps {
    title:string
}

function Title({title}: TypeTitleProps) {
    return (
        <Typography variant="h6" color="inherit">
            {title}
        </Typography>
    )
}

export default Header