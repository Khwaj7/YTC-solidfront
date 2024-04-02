import { createEffect, createSignal, Setter } from "solid-js";
import { Button, TextField } from "@suid/material";
import SignInSide from "../SigninSide/signInSide";

interface IParams {
    setApiKey: Setter<string | undefined>;
}

export default (props: IParams) => {
    const [formApiKey, setFormApiKey] = createSignal<string>('');

    createEffect((e) => {
        props.setApiKey(formApiKey); console.log("api key updated ?", formApiKey());
        });

    return (
        <SignInSide setFormApiKey={setFormApiKey}></SignInSide>
    )
}