import React, { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import { keyBy } from "lodash";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { months } from "../Data";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Barchart = ({ datas, title }) => {
  // --------memo----------
  const dataDashboards = useMemo(() => {
    const array = [];
    const months = keyBy(datas, (data) => (data.month ?? 0) - 1);

    [...Array(12)].map((i, index) => {
      array.push(months[index]?.total ?? 0);
    });
    return array;
  }, [datas]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  const data = {
    labels: months,
    datasets: [
      {
        label: title,
        data: dataDashboards,
        backgroundColor: ["rgba(255, 206, 86, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <Bar
        options={options}
        data={data}
        width={80}
        height={30}
        style={{ margin: "1rem auto", width: "90%" }}
      />
    </>
  );
};

export default Barchart;
