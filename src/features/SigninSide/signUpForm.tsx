import Typography from "@suid/material/Typography";
import TextField from "@suid/material/TextField";
import Box from "@suid/material/Box";
import Button from "@suid/material/Button";
import Grid from "@suid/material/Grid";
import Link from "@suid/material/Link";
import { Setter } from "solid-js";

export interface IParams {
  setSignUp: Setter<Boolean>;
}

export default function SignUpForm(props: IParams) {

  return (
    <>
      <Typography component="h1" variant="h5">
        Sign Up
      </Typography>
      <Box component="form" noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="ytusername"
          label="Youtube username"
          name="ytUsername"
          autoFocus
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign Up
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot your API key?
            </Link>
          </Grid>
          <Grid item>
            <Button variant="text" onClick={() => props.setSignUp(false)}>
              {"Have an account? Sign in"}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}