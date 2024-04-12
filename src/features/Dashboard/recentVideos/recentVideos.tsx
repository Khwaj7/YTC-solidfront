import Grid from "@suid/material/Grid/Grid";
import Paper from "@suid/material/Paper/Paper";

export default function RecentVideos() {
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