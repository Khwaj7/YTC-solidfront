import { styled, createTheme, ThemeProvider } from '@suid/material/styles';
import CssBaseline from '@suid/material/CssBaseline';
import Box from '@suid/material/Box';
import Toolbar from '@suid/material/Toolbar';
import List from '@suid/material/List';
import Typography from '@suid/material/Typography';
import Divider from '@suid/material/Divider';
import IconButton from '@suid/material/IconButton';
import Badge from '@suid/material/Badge';
import Container from '@suid/material/Container';
import Grid from '@suid/material/Grid';
import Paper from '@suid/material/Paper';
import MenuIcon from '@suid/icons-material/Menu';
import ChevronLeftIcon from '@suid/icons-material/ChevronLeft';
import NotificationsIcon from '@suid/icons-material/Notifications';
import { mainListItems, secondaryListItems } from './listItems';
import { For, Resource, createSignal } from 'solid-js';
import { IUser } from '../../modules/models/IUser';
import { IComment } from '../../modules/models/IComment';
import { Button, ButtonGroup, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@suid/material';
import { Chart1 } from './AtAGlance/chart1';
import { Copyright } from '../../components/Copyright/copyright';
import { AppBar } from '../../components/AppBar/appBar';
import { Drawer } from '../../components/Drawer/drawer';
import AtAGlance from './AtAGlance/atAGlance';
import RecentVideos from './recentVideos/recentVideos';

interface IParams {
  user: Resource<IUser>;
}
// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();
const drawerWidth: number = 240;

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
        <AppBar component="div" position="absolute">
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
        <Drawer variant="permanent" open={open} drawerWidth={drawerWidth}>
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
              <AtAGlance />

              <RecentVideos />
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