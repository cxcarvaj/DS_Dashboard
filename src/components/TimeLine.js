import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

const TimeLine = () => {
  const [series, setSeries] = useState([]);
  const [hours, setHours] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get("http://127.0.0.1:8000/timeline/");
        console.log(data)
        const serie = [
          {
            name: "Sales",
            type: "column",
            data: data.sales,
          },
          {
            name: "Gains",
            type: "column",
            data: data.gain,
          },
        ];
        setSeries(serie);
        setHours(data.hours);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  const options = {
    chart: {
      height: 350,
      type: "line",
      stacked: false,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: [1, 1, 4],
    },
    title: {
      text: "Línea de tiempo (hora VS venta y ganancia)",
      align: "left",
      offsetX: 110,
    },
    xaxis: {
      categories: hours,
    },
    yaxis: [
      {
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: "#008FFB",
        },
        labels: {
          style: {
            colors: "#008FFB",
          },
        },
        title: {
          text: "Sales ($)",
          style: {
            color: "#008FFB",
          },
        },
        tooltip: {
          enabled: true,
        },
      },
      {
        seriesName: "Sales ($)",
        opposite: true,
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: "#00E396",
        },
        labels: {
          style: {
            colors: "#00E396",
          },
        },
        title: {
          text: "Gains ($)",
          style: {
            color: "#00E396",
          },
        },
      },
    ],
    tooltip: {
      fixed: {
        enabled: true,
        position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
        offsetY: 30,
        offsetX: 60,
      },
    },
    legend: {
      horizontalAlign: "left",
      offsetX: 40,
    },
  };

  return (
    <div>
      <Chart
        options={options}
        series={series}
        type="line"
        width="800"
        height="480"
      />
    </div>
  );
};
export default TimeLine;
