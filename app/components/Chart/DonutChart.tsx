import { useMemo, useRef } from "react";
import CountUp from "react-countup";
import * as d3 from "d3";
import './chart.css'

type DataItem = {
  name: string;
  value: number;
};
type DonutChartProps = {
  width: number;
  height: number;
  data: DataItem[];
};

const MARGIN_X = 150;
const MARGIN_Y = 50;
const INFLEXION_PADDING = 30; // space between donut and label inflexion point

const colors = [
  "#2C71E5",
  "#435861",
  "#E75244",
  "#DBE3F4",
];

export const DonutChart = ({ width, height, data }: DonutChartProps) => {
  const countUpRef = useRef()
  const radius = Math.min(width - 3 * MARGIN_X, height - 2 * MARGIN_Y) / 2;
  const innerRadius = radius / 2;

  const pie = useMemo(() => {
    const pieGenerator = d3.pie<any, DataItem>().value((d: any) => d.value);
    return pieGenerator(data);
  }, [data]);

  const arcGenerator = d3.arc();

  const shapes = pie.map((grp, i) => {
    // First arc is for the donut
    const sliceInfo = {
      innerRadius,
      outerRadius: radius,
      startAngle: grp.startAngle,
      endAngle: grp.endAngle,
    };
    const centroid = arcGenerator.centroid(sliceInfo);
    const slicePath: any = arcGenerator(sliceInfo) && arcGenerator(sliceInfo);

    // Second arc is for the legend inflexion point
    const inflexionInfo = {
      innerRadius: radius + INFLEXION_PADDING,
      outerRadius: radius + INFLEXION_PADDING,
      startAngle: grp.startAngle,
      endAngle: grp.endAngle,
    };
    const inflexionPoint = arcGenerator.centroid(inflexionInfo);

    const isRightLabel = inflexionPoint[0] > 0;
    const labelPosX = inflexionPoint[0] + 50 * (isRightLabel ? 1 : -1);
    const textAnchor = isRightLabel ? "start" : "end";
    const label = grp.data.name;
    const labelPer = grp.data.value + "%"
    let fillColor = ''
    switch(i){
      case 0:
        fillColor = "#2C71E5";
        break;
      case 1:
        fillColor = "#DBE3F4";
        break;
      case 2:
        fillColor = '#E75244';
        break;
      case 3:
        fillColor = '#4F6873';
        break;
    }
    return (
      <g key={i}>
        <path d={slicePath} fill={colors[i]} />
        <circle cx={centroid[0]} cy={centroid[1]} r={2} stroke={"white"}
          fill={"white"}/>
        <line
          x1={centroid[0]}
          y1={centroid[1]}
          x2={inflexionPoint[0]}
          y2={inflexionPoint[1]}
          stroke={"white"}
          fill={"white"}
        />
        <line
          x1={inflexionPoint[0]}
          y1={inflexionPoint[1]}
          x2={labelPosX}
          y2={inflexionPoint[1]}
          stroke={"white"}
          fill={"white"}
        />

        {/* <CountUp start={1} end={parseInt(labelPer.slice(0, label.length-1))} duration={2}>
                        {({ countUpRef, start }) => (
                          <text
                            ref={countUpRef}
                            x={labelPosX + (isRightLabel ? 2 : -2)}
                            y={inflexionPoint[1]}
                            textAnchor={textAnchor}
                            dominantBaseline="top"
                            fontSize={50}
                            fill={fillColor}
                            className="fill-color"
                            onMouseOver={start}
                          />
                        )}
              </CountUp> */}

        <text
          x={labelPosX + (isRightLabel ? 2 : -2)}
          y={inflexionPoint[1]}
          textAnchor={textAnchor}
          dominantBaseline="top"
          fontSize={50}
          fill={fillColor}
          className="fill-color"
        >
          {labelPer}
        </text>
        <text
          x={labelPosX + (isRightLabel ? 2 : -2)}
          y={inflexionPoint[1] + 20}
          textAnchor={textAnchor}
          dominantBaseline="middle"
          fontSize={15}
          fill={'white'}
        >
          {label}
        </text>
      </g>
    );
  });


  return (
    <svg width={width} height={height} style={{ display: "inline-block" }}>
      <g transform={`translate(${width / 2}, ${height / 2})`}>{shapes}</g>
    </svg>
  );
};
