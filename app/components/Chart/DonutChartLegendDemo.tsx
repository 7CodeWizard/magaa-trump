import { data } from "./data";
import { DonutChart } from "./DonutChart";

export const DonutChartLegendDemo = ({ width = 1000, height = 1000 }) => (
  <DonutChart data={data} width={width} height={height} />
);
