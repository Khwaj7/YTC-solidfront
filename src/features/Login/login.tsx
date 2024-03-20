import {createSignal, Setter} from "solid-js";
import {Button} from "@suid/material";

interface IParams {
    setApiKey: Setter<string | undefined>;
}

export default (props: IParams) => {
    const [formApiKey, setFormApiKey] = createSignal<string>('');

    return (
        <><h2>Login using your API key</h2>
            <input type="text" placeholder="enter your api key"
                   onInput={e => setFormApiKey(e.currentTarget.value)}></input>
            <Button variant="contained" onClick={e => props.setApiKey(formApiKey)}>Login with API Key</Button>
        </>
    )
}