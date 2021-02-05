import React from "react";
import TextField from "@material-ui/core/TextField";

interface TypeInput {
    className:string
    inputRef: any
    name: string
    defaultValue: string
    type: string
}

const Input = ({className, inputRef, name, defaultValue, type}: TypeInput) => {
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