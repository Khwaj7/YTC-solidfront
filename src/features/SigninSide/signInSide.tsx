import Avatar from "@suid/material/Avatar";
import CssBaseline from "@suid/material/CssBaseline";
import Paper from "@suid/material/Paper";
import Box from "@suid/material/Box";
import Grid from "@suid/material/Grid";
import LockOutlinedIcon from "@suid/icons-material/LockOutlined";
import { Accessor, createSignal, Match, Setter, Switch } from "solid-js";
import { Copyright } from "../../components/Copyright/copyright";
import { useSignInSide } from "./useSignInSide";
import LoginForm from "./loginForm";
import SignUpForm from "./signUpForm";
import { toast, Toaster } from "solid-toast";

interface IProps {
  setFormApiKey: Setter<string>;
}

export default function SignInSide(props: IProps) {
  const [background, setBackground] = createSignal<string>("");
  const [isSignUp, setIsSignUp] = createSignal<boolean>(false);
  const { getRandomImage } = useSignInSide({ unsplashApiKey: "55VVozkFgVV5_E9HUS3BCICzuE4pks7-xFbeoi3Zobo" });
  getRandomImage().then(value => setBackground(value.urls.regular));

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${background()})`,
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Switch>
            <Match when={isSignUp()}>
              <SignUpForm setSignUp={setIsSignUp}></SignUpForm>
            </Match>
            <Match when={!isSignUp()}>
              <LoginForm setSignUp={setIsSignUp} setFormApiKey={props.setFormApiKey} />
            </Match>
          </Switch>
          <Copyright sx={{ mt: 5 }} />
        </Box>
      </Grid>
    </Grid>
  );
}