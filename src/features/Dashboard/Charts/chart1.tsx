import { SolidApexCharts } from 'solid-apexcharts';
import { createSignal } from 'solid-js';

export function Chart1() {
    const [options] = createSignal({
        xaxis: {
            categories: ["Video 1", "Video 2", "Video 3", "Video 4", "Video 5"],
        },
    });
    const [series] = createSignal([
        {
            name: 'unwanted',
            data: [30, 40, 35, 50, 49, ],
        },
        {
            name: 'question',
            data: [23, 12, 54, 61, 32, ],
        },
        {
            name: 'feedback',
            data: [23, 12, 54, 61, 32],
        },
        {
            name: 'idea',
            data: [62, 12, 45, 55, 76],
        },
        {
            name: 'collaboration',
            data: [62, 12, 45, 55, 76],
        }

    ]);

    return <SolidApexCharts width="500" type="bar" stacked="true"
        options={{ ...options(), plotOptions: { bar: { horizontal: true } }, chart: { stacked: true, stackType: "100%" } }} series={series()} />;
}