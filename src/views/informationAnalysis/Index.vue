<template>
  <div class="container">
    <div class="container-top">
      <JobPanelItem
        v-for="item in itemList"
        :name="item.name"
        :data="item.data"
        :logoUrl="item.icon"
        :key="item.id"
      />
    </div>
    <div class="container-mid" id="bar"><BarChart></BarChart></div>
    <div class="container-mid" id="line"><LineChart></LineChart></div>
  </div>
</template>
<script>
import JobPanelItem from "./components/JobPanelItem.vue"
import BarChart from "./components/BarChart.vue"
import LineChart from "./components/LineChart.vue"
export default {
  name: "",
  components: {
    JobPanelItem,
    BarChart,
    LineChart,
  },
  props: {
    jobPanelData: {
      type: Object,
    },
  },

  data() {
    return {
      itemList: [
        {
          id: "1",
          name: "设备总数",
          icon: require("../../assets/images/project.png"),
          data: "2",
          // param: 'projectTotal'
        },
        {
          id: "2",
          name: "年度购入总数",
          icon: require("../../assets/images//job.png"),
          data: "5",
          // param: 'jobTotal'
        },
        {
          id: "3",
          name: "当前空闲总数",
          icon: require("../../assets/images//success.png"),
          data: "8",
          // param: 'jobSucTotal'
        },
        {
          id: "4",
          name: "当前故障总数",
          icon: require("../../assets/images//fail.png"),
          data: "6",
          // param: 'jobFailTotal'
        },
        {
          id: "5",
          name: "当前使用总数",
          icon: require("../../assets/images//execution.png"),
          data: "10",
          // param: 'jobRunningTotal'
        },
        {
          id: "6",
          name: "设备当前使用率",
          icon: require("../../assets/images/rate.png"),
          data: "20%",
          // param: 'jobSuccessRate'
        },
      ],
    }
  },

  watch: {
  },
  mounted() {},
  methods: {
    
  },
}
</script>
<style lang="scss" scoped>
.container {
  .container-top {
    display: flex;
    height: 200px;
    padding: 20px 20px 0 20px;
    justify-content: space-between;
    background-color: #f0f2f5;
  }
  .container-mid {
    margin: 10px 0;
    height: 400px;
    padding: 20px 20px 0 20px;
    background-color: #c5d1e2;
  }
}
</style>
