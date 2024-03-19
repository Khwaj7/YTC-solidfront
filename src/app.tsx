import {createResource, createSignal, Match, Show, Switch} from "solid-js";
import "./app.css";
import Login from "~/features/Login/login";
import {useLogin} from "~/features/Login/useLogin";
import {mapUserResponseUser} from "~/models/mappers/mapUserResponseUser";
import {Home} from "~/features/Home/home";


const fetchUserByApiKey = async (id: string) => (await fetch(`http://localhost:1234/users?apikey=${id}`)).json();
const getUser = async (id: string) => {
    console.log("id", id);
    const userResponse = await fetchUserByApiKey(id);
    return mapUserResponseUser(userResponse);
}

export default function App() {
    const [apiKey, setApiKey] = createSignal<string>();
    const [user] = createResource(apiKey, getUser);

    return (
        <main>
            <h1>YTC</h1>
            <Switch>
                <Match when={!user()}>
                    <Login setApiKey={setApiKey}/>
                </Match>
                <Match when={user.error}>
                    <span>Error: {user.error}</span>
                </Match>
                <Match when={user()}>
                    <div>user: {JSON.stringify(user())}</div>
                    <Home></Home>
                </Match>
            </Switch>
        </main>
    );
}
