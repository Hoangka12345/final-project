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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Barchart = ({ datas }) => {
  // --------memo----------
  const labels = useMemo(() => {
    const array = [];
    datas.map((data) => array.push(data.username));
    return array;
  }, [datas]);

  const total = useMemo(() => {
    const array = [];
    datas.map((data) => array.push(data.totalCost));
    return array;
  });

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  const data = {
    labels: labels,
    datasets: [
      {
        label: "a company total income",
        data: total,
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
