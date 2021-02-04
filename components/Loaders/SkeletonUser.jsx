import React from "react";

import {makeStyles} from '@material-ui/core/styles';

import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles({
    root: {
        width: 300,
        margin: 30,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    info: {
        alignSelf:"flex-start",
        paddingTop: 25,
        paddingBottom: 25
    },
    tools: {
        width: "100%",
        display: "flex",
        justifyContent: "space-around"
    }
});

const SkeletonUser = ({ children, loading}) => {
    const classes = useStyles();

    if (loading) {
        return (
            Array(20)
                .fill(0)
                .map((_, index) => <div key={index} className={classes.root}>
                    <Skeleton variant="circle" width={100} height={100} />
                    <div className={classes.info}>
                        <Skeleton variant="text" width={150} height={32} />
                        <Skeleton variant="rect" width={210} height={118} />
                    </div>
                    <div className={classes.tools}>
                        <Skeleton variant="text" width={50} height={32} />
                        <Skeleton variant="text" width={50} height={32} />
                    </div>
                    <div><Skeleton variant="text" width={50} height={32} /></div>
                </div>)
        );
    }

    return children;
}

export default SkeletonUser