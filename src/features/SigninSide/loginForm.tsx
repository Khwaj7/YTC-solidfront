import Typography from "@suid/material/Typography";
import Box from "@suid/material/Box";
import TextField from "@suid/material/TextField";
import FormControlLabel from "@suid/material/FormControlLabel";
import Checkbox from "@suid/material/Checkbox";
import Button from "@suid/material/Button";
import Grid from "@suid/material/Grid";
import Link from "@suid/material/Link";
import { Accessor, Setter } from "solid-js";

export interface IParams {
  setFormApiKey: Setter<string>;
  setSignUp: Setter<Boolean>;
}

export default function LoginForm(props: IParams) {
  const handleSubmit = (event: HTMLFormElement) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    props.setFormApiKey(data.get("apikey") as string);
  };

  return (
    <>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="apikey"
          label="Your API Key"
          name="apikey"
          autoFocus
        />
        <FormControlLabel
          control={<Checkbox disabled value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot your API key?
            </Link>
          </Grid>
          <Grid item>
            <Button variant="text" onClick={() => props.setSignUp(true)}>
              {"Don't have an account? Sign Up"}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};