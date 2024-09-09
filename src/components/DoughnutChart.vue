<template>
  <div id="appl">
    <apexchart
     
      type="donut"
      :options="options"
      :series="[activePortals,completedPortals,canceledPortals]"
    ></apexchart>
  </div>
</template>

<script>
import apexchart from "vue3-apexcharts";
export default {
  name: "DoughnutChart",
  props:{
    activePortals :{
      type : Number,
      default: 0
    },
    completedPortals : {
      type : Number,
      default: 0
    },
    canceledPortals : {
      type : Number,
      default: 0
    }
  },

  data() {
    return {

      options: {
        legend: {
          show: false,
        },
        dataLabels: {
          enabled: false,
        },
        plotOptions: {
          pie: {
            expandOnClick: false,
            donut: {
              size: "85%",
            },
          },
        },
        stroke: {
          show: false,
          curve: "smooth",
          lineCap: "butt",
          colors: undefined,
          width: 2,
          dashArray: 0,
        },
        fill: {
          colors: ["#347DE7", "#113a6b", "#e73b9a"],
        },
      },

    };
  },
};
</script>
