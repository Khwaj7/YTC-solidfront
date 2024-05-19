import Grid from "@suid/material/Grid/Grid";
import Paper from "@suid/material/Paper/Paper";
import VideoCard from "../../Video/components/videoCard";
import { For, Resource, Show } from "solid-js";
import { CircularProgress, Stack } from "@suid/material";
import { IVideo } from "../../../modules/models/IVideo";

interface IProps {
  userId: number;
  videos: Resource<IVideo[]>;
}

export default function RecentVideos(props: IProps) {
  return (
    <Grid item xs={12} md={4} lg={4}>
      <Paper
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          height: 240
        }}
        style={{ height: "30em" }}
      >
        <span>Recent Videos</span>
        <Show when={props.videos.loading}>
          <Stack sx={{ color: "grey.500" }} spacing={2} direction="row" flex="auto" alignItems="center"
                 justifyContent="center">
            <CircularProgress color="info" />
          </Stack>
        </Show>
        <Show when={props.videos()}>
          <For each={props.videos()}>{(item, index) =>
            <Show when={index() == 1 || index() == 4}>
              <VideoCard video={item} />
            </Show>
          }
          </For>
        </Show>
        <Show when={props.videos.error}>
          <p>Loading failed : {props.videos.error}</p>
        </Show>
      </Paper>
    </Grid>
  );
}