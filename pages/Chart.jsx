import React, { useEffect, useState,useRef } from "react";
import { Bar } from "react-chartjs-2";
import { useRouter } from 'next/router';
import { Pie } from "react-chartjs-2";
import 'chart.js/auto';
const Chart = () => {

const [dt , setData] = useState([]);
const [lbl , setLabel] = useState([]);
const _datas = [];
const labels =  [];
const ref = useRef();

useEffect(()=>{
    fetching().then(res=>{
        console.log(res);
    });
})

const fetching=async ()=>{

    const res_ = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL}/cubeit/api/chauffeurs/get-all`
        
    );
    const data = await res_.json();
  
    data.forEach(element => {
         _datas.push(element.score_avg);
         labels.push(element.fullname);
    });

    setData(_datas);
    setLabel(labels);
    
}

  const barChartData = {
    labels:lbl,
    datasets: [
      {
        data: dt,
        label: "Infected People",
        
        borderColor: "#3333ff",
        backgroundColor: "rgba(0, 0, 255, 0.5)",
        fill: true
      },
      
     
    ]
  };

  const barChart = (
    <div className="jumbotron">
      
      <Bar
      type="bar"
      width={130}
      height={50}
      options={{
        title: {
          display: true,
          text: "score",
          fontSize: 15
        },
        legend: {
          display: true, //Is the legend shown?
          position: "top" //Position of the legend.
        }
      }}
      ref={ref}
      data={barChartData}
    />
       
      
    </div>
    

   
  );
  return barChart;
};

export default Chart;