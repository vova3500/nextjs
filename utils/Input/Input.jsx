import React from "react";
import TextField from "@material-ui/core/TextField";

const Input = ({className, inputRef, name, defaultValue, type}) => {
   return <TextField
        className={className}
        defaultValue={defaultValue}
        label={name}
        name={name}
        inputRef={inputRef}
        type={type}
    />
}

export default Input