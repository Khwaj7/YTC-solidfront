import {useLogin} from "~/features/Login/useLogin";
import {createSignal, Resource, Setter} from "solid-js";
import {IUser} from "~/models/IUser";

interface IParams {
    setApiKey: Setter<string | undefined>;
}

export default (props: IParams) => {
    const [formApiKey, setFormApiKey] = createSignal<string>('');

    return (
        <><h2>Login using your API key</h2>
            <input type="text" placeholder="enter your api key"
                   onInput={e => setFormApiKey(e.currentTarget.value)}></input>
            <button onClick={e => props.setApiKey(formApiKey)}>Login with API Key</button>
        </>
    )
}