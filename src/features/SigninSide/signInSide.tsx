import Avatar from '@suid/material/Avatar';
import Button from '@suid/material/Button';
import CssBaseline from '@suid/material/CssBaseline';
import TextField from '@suid/material/TextField';
import FormControlLabel from '@suid/material/FormControlLabel';
import Checkbox from '@suid/material/Checkbox';
import Link from '@suid/material/Link';
import Paper from '@suid/material/Paper';
import Box from '@suid/material/Box';
import Grid from '@suid/material/Grid';
import LockOutlinedIcon from '@suid/icons-material/LockOutlined';
import Typography from '@suid/material/Typography';
import { createTheme, ThemeProvider } from '@suid/material/styles';
import { Setter } from 'solid-js';
import { Copyright } from '../../components/Copyright/copyright';

interface IProps {
    setFormApiKey: Setter<string>;
}

export default function SignInSide(props: IProps) {
    const handleSubmit = (event: HTMLFormElement) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            apikey: data.get('apikey'),
        });
        props.setFormApiKey(data.get('apikey') as string);
    };

    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <CssBaseline />
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
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
                            control={<Checkbox value="remember" color="primary" />}
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
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                        <Copyright sx={{ mt: 5 }} />
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}