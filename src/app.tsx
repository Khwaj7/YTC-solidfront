import "./app.css";
import { createEffect, Match, Switch } from "solid-js";
import Login from "./features/Login/login";
import { Home } from "./features/Home/home";
import { createTheme, ThemeProvider } from "@suid/material";
import { useApp } from "./useApp";
import { toast, Toaster } from "solid-toast";

export default function App() {
  const { apiKey, setApiKey, user, error } = useApp();
  const defaultTheme = createTheme();

  createEffect(() => {
    if (error())
      toast.error(error());
  });

  return (
    <ThemeProvider theme={defaultTheme}>
      <Switch>
        <Match when={!user()}>
          <Toaster position="top-right" gutter={8} />
          <Login setApiKey={setApiKey} />
        </Match>
        <Match when={user.error}>
          <Toaster position="top-right" gutter={8} />
        </Match>
        <Match when={user()}>
          <div>user: {JSON.stringify(user())}</div>
          <Home user={user} apiKey={apiKey()}></Home>
        </Match>
      </Switch>
    </ThemeProvider>
  );
}
