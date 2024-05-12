import Grid from "@suid/material/Grid/Grid";
import Paper from "@suid/material/Paper/Paper";
import { useRecentVideos } from "./useRecentVideos";
import VideoCard from "../../Video/components/videoCard";
import { createMemo, createSignal } from "solid-js";
import { IChannel } from "../../../modules/models/IChannel";
import { IVideo } from "../../../modules/models/IVideo";

interface IProps {
  userId: number;
}

export default function RecentVideos(props: IProps) {
  const [channel, setChannel] = createSignal<IChannel>();
  const [video, setVideo] = createSignal<IVideo>();
  const { getChannel, getVideos } = useRecentVideos({ userId: props.userId });

  getChannel(props.userId).then(value => {
    setChannel(value);
  });

  const videos = createMemo(async () => {
      console.log("channel()", channel());
        if (channel()[0].id) {
          const vid = await getVideos(channel()[0].id.toString());
          return setVideo(vid);
        }
      }
    )
  ;

  console.log("getVideo");
  console.log(video());

  const videoData = {
    title: "OSS 117 : Comment est votre second degré ?",
    thumbnail: "https://i.ytimg.com/vi/H0fURk7ykLI/maxresdefault.jpg",
    views: "1.7M",
    likes: "65K"
  };

  return (
    <Grid item xs={12} md={4} lg={5}>
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
        <VideoCard video={videoData} />
        <VideoCard video={videoData} />
      </Paper>
    </Grid>
  );
}