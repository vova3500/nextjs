import React, {useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";

import {followAndUnfollow} from "../../../redux/actions/users";

import { makeStyles } from '@material-ui/core/styles';
import {Autocomplete} from "@material-ui/lab";
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%)`,
        width: "40%",
        minHeight: 150,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
    },
    form: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center"
    },
    autocomplete: {
        width:"90%"
    },
    button: {
        width: "30%",
        marginTop: 20
    }
}));

interface TypeModalFollowForm {
    users: Array<object>
}

interface TypeModalFollowSelector {
    users: {
        items: Array<{
            id:string
            follow: Array<object>
            lastName: string
        }>
    }
}

const ModalFollow  = (id: string) => {
    const classes = useStyles();
    const dispatch = useDispatch()

    const { control, handleSubmit} = useForm();

    const users = useSelector((state: TypeModalFollowSelector) => state.users.items)

    const [myUser] = useState(users.filter((user:{id: string}) => user.id === id))

    const usersFollowing = users.filter((user: {follow: Array<object>}) => user.follow)

    const onSubmit = (data: TypeModalFollowForm) => {
        dispatch(followAndUnfollow(data.users, id))
    };

    return (
        <div className={classes.root}>
            <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="users"
                    control={control}
                    defaultValue={usersFollowing}
                    render={
                        ({onChange}) => (
                            <Autocomplete
                                className={classes.autocomplete}
                                multiple
                                limitTags={4}
                                id="multiple-limit-tags"
                                options={users}
                                defaultValue={myUser[0] && myUser[0].follow}
                                renderInput={(params) => (
                                    <TextField  {...params} variant="outlined" label="AllUser" />
                                )}
                                onChange={(_, data) =>onChange(data)}
                            />
                        )
                    }
                />
                <Button className={classes.button} type={'submit'} variant="contained" color="primary">
                    Send
                </Button>
            </form>
        </div>
    )
}

export default  ModalFollow