import Grid from "@suid/material/Grid/Grid";
import Paper from "@suid/material/Paper/Paper";
import { createEffect, createSignal, Resource, Show } from "solid-js";
import { SolidApexCharts } from "solid-apexcharts";
import { IVideo } from "../../../modules/models/IVideo";
import { useAtAGlance } from "./useAtAGlance";
import { IStat } from "../../../modules/models/IStat";
import { CircularProgress, Stack } from "@suid/material";

interface IParams {
  videos: Resource<IVideo[]>;
}

export default function AtAGlance(props: IParams) {
  const { getStatsByVideoId, getStatsByVideos } = useAtAGlance();
  const [stats, setStats] = createSignal<IStat[]>();
  const [series, setSeries] = createSignal([]);

  getStatsByVideos(props.videos()).then(videoStats => {
    setStats(videoStats);
  });
  // create categories (ordonnees)
  let categories: string[] = [];
  props.videos().forEach((vid, index) => {
    if (index > 4) return null;
    categories.push(vid.title);
  });

  const [options] = createSignal({
    xaxis: {
      categories: categories
    }
  });

  createEffect(() => {
    if (stats() != undefined) {
      setSeries([
        {
          name: "unwanted",
          data: [stats()[0].totalUnwanted, 40, 35, 50, 49]
        },
        {
          name: "question",
          data: [stats()[0].totalQuestion, 12, 54, 61, 32]
        },
        {
          name: "feedback",
          data: [stats()[0].totalFeedback, 12, 54, 61, 32]
        },
        {
          name: "idea",
          data: [stats()[0].totalIdea, 12, 45, 55, 76]
        },
        {
          name: "collaboration",
          data: [stats()[0].totalCollaboration, 12, 45, 55, 76]
        }
      ]);
    }
  });

  return (
    <Grid item xs={12} md={2} lg={8}>
      <Paper
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
        style={{ height: "30em" }}
      >
        <span>At A Glance</span>
        <h3>Your latest videos</h3>
        <Show when={stats() == undefined}>
          <Stack sx={{ color: "grey.500" }} spacing={2} direction="row" flex="auto" alignItems="center"
                 justifyContent="center">
            <CircularProgress color="info" />
          </Stack>
        </Show>
        <Show when={stats()}>
          <SolidApexCharts width="550" type="bar" stacked="true" options={{
            ...options(),
            plotOptions: { bar: { horizontal: true } },
            chart: { stacked: true, stackType: "100%" }
          }} series={series()} />
        </Show>
      </Paper>
    </Grid>
  );
}