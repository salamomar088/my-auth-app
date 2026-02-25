import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexDataLabels,
  ApexStroke,
  ApexTitleSubtitle,
  ApexPlotOptions,
  ApexNonAxisChartSeries,
  ApexFill,
  ApexGrid,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  chart: ApexChart;

  xaxis?: ApexXAxis;
  yaxis?: ApexYAxis;

  dataLabels?: ApexDataLabels;
  stroke?: ApexStroke;
  title?: ApexTitleSubtitle;

  plotOptions?: ApexPlotOptions;
  fill?: ApexFill;
  grid?: ApexGrid;

  labels?: string[];
  tooltip?: ApexTooltip;
};
