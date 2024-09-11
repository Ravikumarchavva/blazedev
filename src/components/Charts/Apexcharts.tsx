import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface ApexChartProps {}

interface ApexChartState {
  series: Array<{ name: string; data: number[][]; type?: string }>;
  options: ApexOptions; // Use ApexOptions for type checking
}

class ApexChart extends React.Component<ApexChartProps, ApexChartState> {
  constructor(props: ApexChartProps) {
    super(props);

    // Linear Regression Points (actual data points)
    const points = [
      [1, 3],  
      [5, 14], 
      [10, 18], 
      [15, 31], 
      [20, 41]
    ];

    // Estimated regression line - connecting the first and last point
    const estimatedLine = [
      [1, 3],  
      [20, 41]  // Just an estimate connecting the first and last point
    ];

    this.state = {
      series: [
        {
          name: "Original Points",
          data: points,
          type: 'scatter', // Original points as scatter plot
        },
        {
          name: "Estimated Regression Line",
          data: estimatedLine,
          type: 'line', // Straight line connecting the first and last points
        }
      ],
      options: {
        chart: {
          zoom: {
            enabled: false, 
          },
          toolbar: {
            show: false 
          }
        },
        xaxis: {
          tickAmount: 10,
          labels: {
            formatter: (val) => parseFloat(val).toFixed(1),
            style: {
              colors: "white"
            }
          },
          title: {
            text: 'Dependent Variable (X)',
            style: {
              color: "white"
            }
          }
        },
        yaxis: {
          tickAmount: 5,
          labels: {
            formatter: (val: number) => parseFloat(String(val)).toFixed(1),
            style: {
              colors: "white"
            }
          },
          title: {
            text: 'Independent Variable (Y)',
            style: {
              color: "white"
            }
          }
        },
        tooltip: {
          enabled: true,
          theme: 'dark',
          style: {
            fontSize: '14px'
          },
          marker: {
            show: true,
          },
          fillSeriesColor: false,
          custom: function({ series, seriesIndex, dataPointIndex, w }) {
            return (
              `<div style="background: #ff6347; padding: 10px; border-radius: 4px;">
                <span style="color: white;">X: ${series[seriesIndex][dataPointIndex][0]}</span><br />
                <span style="color: white;">Y: ${series[seriesIndex][dataPointIndex][1]}</span>
              </div>`
            );
          }
        }
      }
    };
  }

  render() {
    return (
      <div>
        <div id="chart">
          <ReactApexChart
            options={this.state.options}
            series={this.state.series}
            type="line" // Use 'line' to allow mixed chart types
            height={350}
          />
        </div>
      </div>
    );
  }
}

export default ApexChart;
