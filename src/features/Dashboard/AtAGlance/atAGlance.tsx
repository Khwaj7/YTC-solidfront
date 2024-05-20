import Grid from "@suid/material/Grid/Grid";
import Paper from "@suid/material/Paper/Paper";
import { createSignal, Resource } from "solid-js";
import { SolidApexCharts } from "solid-apexcharts";
import { IVideo } from "../../../modules/models/IVideo";
import { useAtAGlance } from "./useAtAGlance";
import { IStat } from "../../../modules/models/IStat";

interface IParams {
  videos: Resource<IVideo[]>;
}

export default function AtAGlance(props: IParams) {
  const { getStatsByVideoId } = useAtAGlance();
  const [stats, setStats] = createSignal<IStat[]>();

  getStatsByVideoId(props.videos()[0].id).then(value => {
    setStats([value]);
    console.log("stats added", stats());
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
  // TODO
  // data table stats[videoId][stat1, stat2, stat3, stat4, stat5] ?
  // to dynamically complete following series object

  console.log("stats()[0].totalUnwanted", stats());
  const [series] = createSignal([
    {
      name: "unwanted",
      data: [stats()[0].totalUnwanted, 40, 35, 50, 49]
    },
    {
      name: "question",
      data: [23, 12, 54, 61, 32]
    },
    {
      name: "feedback",
      data: [23, 12, 54, 61, 32]
    },
    {
      name: "idea",
      data: [62, 12, 45, 55, 76]
    },
    {
      name: "collaboration",
      data: [62, 12, 45, 55, 76]
    }

  ]);

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
        <SolidApexCharts width="550" type="bar" stacked="true" options={{
          ...options(),
          plotOptions: { bar: { horizontal: true } },
          chart: { stacked: true, stackType: "100%" }
        }} series={series()} />
      </Paper>
    </Grid>
  );
}