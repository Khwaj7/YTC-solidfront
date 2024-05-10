import Grid from "@suid/material/Grid/Grid";
import Paper from "@suid/material/Paper/Paper";
import { useRecentVideos } from "./useRecentVideos";
import VideoCard from "../../Video/components/videoCard";

interface IProps {
    userId: number;
}
export default function RecentVideos(props: IProps) {
    const { videos } = useRecentVideos({ userId: props.userId });

    //console.log("videos", videos());

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
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
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