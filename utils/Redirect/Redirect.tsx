import {useRouter} from "next/router";
import {useEffect} from "react";

interface TypeRedirect {
    to : string
}

function Redirect({to}: TypeRedirect) {
    const router = useRouter();

    useEffect(() => {
        router.push(to);
    }, [to]);

    return null;
}

export default Redirect