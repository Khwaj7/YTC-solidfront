import Grid from "@suid/material/Grid/Grid";
import Paper from "@suid/material/Paper/Paper";
import { useRecentVideos } from "./useRecentVideos";

interface IProps {
    userId: number;
}
export default function RecentVideos(props: IProps) {
    const { videos } = useRecentVideos({ userId: props.userId });

    //console.log("videos", videos());

    return (
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
    );
}