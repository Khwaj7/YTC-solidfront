import { styled, createTheme, ThemeProvider } from '@suid/material/styles';
import CssBaseline from '@suid/material/CssBaseline';
import MuiDrawer from '@suid/material/Drawer';
import Box from '@suid/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@suid/material/AppBar';
import Toolbar from '@suid/material/Toolbar';
import List from '@suid/material/List';
import Typography from '@suid/material/Typography';
import Divider from '@suid/material/Divider';
import IconButton from '@suid/material/IconButton';
import Badge from '@suid/material/Badge';
import Container from '@suid/material/Container';
import Grid from '@suid/material/Grid';
import Paper from '@suid/material/Paper';
import Link from '@suid/material/Link';
import MenuIcon from '@suid/icons-material/Menu';
import ChevronLeftIcon from '@suid/icons-material/ChevronLeft';
import NotificationsIcon from '@suid/icons-material/Notifications';
import { mainListItems, secondaryListItems } from './listItems';
import { For, Resource, createSignal } from 'solid-js';
import { IUser } from '../../modules/models/IUser';
import { IComment } from '../../modules/models/IComment';
import { Button, ButtonGroup, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@suid/material';
import { Chart1 } from './Charts/chart1';

interface IParams {
  user: Resource<IUser>;
}
// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Dashboard(props: IParams) {
  const [open, setOpen] = createSignal(true);
  console.log("user", props.user());
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          Welcome back, {props.user().name}
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={2} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    width: '100%',
                    flexDirection: 'column',
                    alignItems: 'center',
                    height: 450
                  }}
                >
                  <span>At A Glance</span>
                  <h3>Your latest videos</h3>
                  <Chart1 />
                </Paper>
              </Grid>
              {/* Recent Deposits */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <span>Recent Videos</span>
                </Paper>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <span>Latest comments to answer</span>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Author</TableCell>
                          <TableCell>Date</TableCell>
                          <TableCell>IA check</TableCell>
                          <TableCell>Comment</TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <For each={[{ commenter: "Max VERSTAPPEN", date: "03/04/2024 18h12", comment: "TOU TOU TOU DOUM - MAX VERSTAPPEEEENNN, je mets du texte en plus pour regarder si ca tient dans la ligne, j'avoue j'aurais pu faire moins degueulasse et aller chercher du lorem, mais bon deja cest pas des datas du back donc je m'en branlus" }]}>
                          {(comment: IComment) => (
                            <TableRow>
                              <TableCell>{comment.commenter}</TableCell>
                              <TableCell>{comment.date}</TableCell>
                              <TableCell><Chip color='warning' label='feedback' /></TableCell>
                              <TableCell>{comment.comment}</TableCell>
                              <TableCell align='right'>
                                <ButtonGroup orientation='vertical' variant="outlined" size='small'>
                                  <Button color='success'>Answer</Button>
                                  <Button color='error'>Delete</Button>
                                  <Button color='warning'>Flag IA error</Button>
                                </ButtonGroup>
                              </TableCell>
                            </TableRow>
                          )}
                        </For>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

// TODO : MOVE INTO A GLOBAL FUNCTION
function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        YTC
      </Link> - ALPHA {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);
