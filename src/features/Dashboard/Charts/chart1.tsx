import { SolidApexCharts } from 'solid-apexcharts';
import { createSignal } from 'solid-js';

export function Chart1() {
    const [options] = createSignal({
        xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
        },
    });
    const [series] = createSignal([
        {
            name: 'series-1',
            data: [30, 40, 35, 50, 49, 60, 70, 91],
        },
    ]);

    return <SolidApexCharts width="500" type="bar" stacked="true" options={{ ...options(), plotOptions: { bar: { horizontal: true } }, chart: { stacked: true, stackType: "100%" } }} series={series()} />;
}