import Grid from "@suid/material/Grid/Grid";
import Paper from "@suid/material/Paper/Paper";
import { useRecentVideos } from "./useRecentVideos";
import VideoCard from "../../Video/components/videoCard";
import { createResource, createSignal, For, Show } from "solid-js";
import { IChannel } from "../../../modules/models/IChannel";
import { CircularProgress, Stack } from "@suid/material";

interface IProps {
  userId: number;
}

export default function RecentVideos(props: IProps) {
  const [channel, setChannel] = createSignal<IChannel>();
  const { getChannel, getVideos } = useRecentVideos({ userId: props.userId });

  const [videos, { refetch }] = createResource(channel, async (currentChannel) => {
    console.log("currentChannel", currentChannel);
    if (currentChannel[0]?.id) {
      const vid = await getVideos(currentChannel[0].id.toString());
      console.log("vid", vid);
      return vid;
    }
  });

  getChannel(props.userId).then(value => {
    setChannel(value);
    console.log("refetch");
    refetch();
  });

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
        <Show when={videos.loading}>
          <Stack sx={{ color: "grey.500" }} spacing={2} direction="row" flex="auto" alignItems="center" justifyContent="center">
            <CircularProgress color="info" />
          </Stack>
        </Show>
        <Show when={videos()}>
          <For each={videos()}>{(item, index) =>
            <Show when={index() == 1 || index() == 4}>
              <VideoCard video={item} />
            </Show>
          }
          </For>
        </Show>
        <Show when={videos.error}>
          <p>Loading failed : {videos.error}</p>
        </Show>
      </Paper>
    </Grid>
  );
}