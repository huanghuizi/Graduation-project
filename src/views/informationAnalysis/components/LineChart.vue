<template>
  <div></div>
</template>
<script>
import * as echarts from "echarts"
export default {
  data() {
    return {
      chart: null,
    }
  },
  
  mounted() {
    this.lineCharts()
  },

  methods: {
    lineCharts() {
      let myChart = echarts.init(document.getElementById("line"))
      myChart.setOption({
        xAxis: {
          data: ["A", "B", "C", "D", "E"],
        },
        yAxis: {},
        series: [
          {
            data: [10, 22, 28, 43, 49],
            type: "line",
            stack: "x",
          },
          {
            data: [5, 4, 3, 5, 10],
            type: "line",
            stack: "x",
          },
        ],
      })
    },
  },
}
</script>
