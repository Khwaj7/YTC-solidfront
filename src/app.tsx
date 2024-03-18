import {createResource, createSignal, Match, Show, Switch} from "solid-js";
import "./app.css";
import {IUser} from "~/models/IUser";
import Login from "~/features/Login/login";
import Channel from "~/features/Channel/channel";
import {useLogin} from "~/features/Login/useLogin";
import {mapUserResponseUser} from "~/models/mappers/mapUserResponseUser";


const fetchUserByApiKey = async (id: string) => (await fetch(`http://localhost:1234/users?apikey=${id}`)).json();
const getUser = async (id:string) => {
    console.log("id", id);
    const userResponse = await fetchUserByApiKey(id);
    return mapUserResponseUser(userResponse);
}

export default function App() {
    const [apiKey, setApiKey] = createSignal<string>();
    const {getUserByApiKey} = useLogin();

    const [user] = createResource(apiKey, getUser);

    console.log("user", user());

    return (
        <main>
            <h1>YTC</h1>
            <Login setApiKey={setApiKey} />
            <Switch>
                <Match when={user.error}>
                    <span>Error: {user.error}</span>
                </Match>
                <Match when={user()}>
                    <div>user: {JSON.stringify(user())}</div>
                </Match>
            </Switch>
        </main>
    );
}
