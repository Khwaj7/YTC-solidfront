import Grid from "@suid/material/Grid/Grid";
import Paper from "@suid/material/Paper/Paper";
import { Chart1 } from "./chart1";

export default function AtAGlance (props: any) {
    return (
        <Grid item xs={12} md={2} lg={7}>
            <Paper
                sx={{
                    p: 2,
                    display: 'flex',
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
    )
}