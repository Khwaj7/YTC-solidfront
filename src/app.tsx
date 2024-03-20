import Button from "@suid/material/Button";
import './app.css'
import { Match, Switch, createEffect, createResource, createSignal } from "solid-js";
import { mapUserResponseUser } from "./models/mappers/mapUserResponseUser";
import Login from "./features/Login/login";
import { Home } from "./features/Home/home";
import { ThemeProvider, createTheme } from "@suid/material";

const fetchUserByApiKey = async (id: string) => (await fetch(`http://localhost:1234/users?apikey=${id}`)).json();
const getUser = async (id: string) => {
  if (id.length > 0) {
    const userResponse = await fetchUserByApiKey(id);
    return mapUserResponseUser(userResponse);
  }
}

export default function App() {
  const [apiKey, setApiKey] = createSignal<string>();
  const [user] = createResource(apiKey, getUser);
  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Switch>
        <Match when={!user()}>
          <Login setApiKey={setApiKey} />
        </Match>
        <Match when={user.error}>
          <span>Error: {user.error}</span>
        </Match>
        <Match when={user()}>
          <div>user: {JSON.stringify(user())}</div>
          <Home></Home>
        </Match>
      </Switch>
    </ThemeProvider>
  );
}
