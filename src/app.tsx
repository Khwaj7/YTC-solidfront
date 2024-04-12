import './app.css'
import { Match, Switch, createEffect, createResource, createSignal } from "solid-js";
import { mapUserResponseUser } from "./modules/models/mappers/mapUserResponseUser";
import Login from "./features/Login/login";
import { Home } from "./features/Home/home";
import { ThemeProvider, createTheme } from "@suid/material";
import { useApp } from './useApp';

export default function App() {
  const { setApiKey, user } = useApp();
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
          <Home user={user}></Home>
        </Match>
      </Switch>
    </ThemeProvider>
  );
}
