import { createTheme, ThemeProvider } from "@suid/material/styles";
import CssBaseline from "@suid/material/CssBaseline";
import Box from "@suid/material/Box";
import Toolbar from "@suid/material/Toolbar";
import List from "@suid/material/List";
import Typography from "@suid/material/Typography";
import Divider from "@suid/material/Divider";
import IconButton from "@suid/material/IconButton";
import Badge from "@suid/material/Badge";
import Container from "@suid/material/Container";
import Grid from "@suid/material/Grid";
import Paper from "@suid/material/Paper";
import MenuIcon from "@suid/icons-material/Menu";
import NotificationsIcon from "@suid/icons-material/Notifications";
import { mainListItems } from "./listItems";
import { createResource, createSignal, For, Resource, Show } from "solid-js";
import { IUser } from "../../modules/models/IUser";
import { IComment } from "../../modules/models/IComment";
import {
  Button,
  ButtonGroup,
  Chip,
  CircularProgress,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@suid/material";
import { Copyright } from "../../components/Copyright/copyright";
import { AppBar } from "../../components/AppBar/appBar";
import AtAGlance from "./AtAGlance/atAGlance";
import RecentVideos from "./RecentVideos/recentVideos";
import { IChannel } from "../../modules/models/IChannel";
import { useDashboard } from "./useDashboard";

interface IParams {
  user: Resource<IUser>;
  apiKey: string;
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Dashboard(props: IParams) {
  const [open, setOpen] = createSignal(true);
  const [channel, setChannel] = createSignal<IChannel>();
  const { getChannel, getVideos } = useDashboard({ userId: props.user().id, apiKey: props.apiKey });

  getChannel(props.user().id).then(value => {
    setChannel(value);
    refetch();
  });

  const [videos, { refetch }] = createResource(channel, async (currentChannel) => {
    if (currentChannel[0]?.id) {
      const vids = await getVideos(currentChannel[0].id.toString());
      return vids;
    }
  });

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar component="div" position="absolute">
          <Toolbar
            sx={{
              pr: "24px" // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" })
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
        <Divider />
        <List component="nav">
          {mainListItems}
        </List>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto"
          }}
        >
          <Toolbar />
          Welcome back, {props.user().name}
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* TODO: pass the videos stats */}
              <Show when={videos.loading}>
                <Stack sx={{ color: "grey.500" }}
                       spacing={2}
                       direction="row"
                       flex="auto"
                       alignItems="center"
                       justifyContent="center">
                  <CircularProgress color="info" />
                </Stack>
              </Show>
              <Show when={videos()}>
                <AtAGlance videos={videos} apiKey={props.apiKey} />
              </Show>

              <RecentVideos userId={props.user().id} videos={videos} />

              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  <span>Latest video comments</span>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Author</TableCell>
                          <TableCell>Date</TableCell>
                          <TableCell>AI check</TableCell>
                          <TableCell>Comment</TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <For each={[{
                          commenter: "Max VERSTAPPEN",
                          date: "03/04/2024 18h12",
                          comment: "TOU TOU TOU DOUM - MAX VERSTAPPEEEENNN, je mets du texte en plus pour regarder si ca tient dans la ligne, j'avoue j'aurais pu faire moins degueulasse et aller chercher du lorem, mais bon deja cest pas des datas du back donc je m'en branlus"
                        }]}>
                          {(comment: IComment) => (
                            <TableRow>
                              <TableCell>{comment.commenter}</TableCell>
                              <TableCell>{comment.date}</TableCell>
                              <TableCell><Chip color="warning" label="feedback" /></TableCell>
                              <TableCell>{comment.comment}</TableCell>
                              <TableCell align="right">
                                <ButtonGroup orientation="vertical" variant="outlined" size="small">
                                  <Button color="success">Answer</Button>
                                  <Button color="error">Delete</Button>
                                  <Button color="warning">Flag AI error</Button>
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