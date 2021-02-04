import {useEffect, useState} from "react";
import withReduxSaga from 'next-redux-saga'
import React from 'react';

import wrapper from "../redux/store";
import Header from "../components/Header/Header";

import {
    createGenerateClassName,
    StylesProvider
} from '@material-ui/core/styles';

const generateClassName = createGenerateClassName({
    productionPrefix: 'myclasses-'
});


function App({Component, pageProps}) {
    const [key, setKey] = useState(0);

    useEffect(() => {
        setKey(1);
    }, [key]);

    return (
        <StylesProvider key={key} generateClassName={generateClassName}>
            <Header/>
            <Component {...pageProps} />
        </StylesProvider>
    )
}

export default wrapper.withRedux(withReduxSaga(App))
