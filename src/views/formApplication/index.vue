<template>
  <div>
    <div class="top">
      <el-tag type="danger" v-show="this.$store.state.permission === 3" @click="gotoBuy">维修申请单</el-tag>
      <el-tag type="warning" v-show="this.$store.state.permission === 2" @click="gotoDelate">报废申请单</el-tag>
    </div>
    <div class="mid">
      <div class="title">我的工作</div>
      <div class="boxes">
        <div class="box-item">待办工作</div>
        <div class="box-item">表单审批</div>
      </div>
      <div class="content-items">
        <div class="items">
          <div class="items-left">xxxxxx表单</div>
          <div>2018-5-20</div>
        </div>
      </div>
    </div>
    <Alter :isShowDialog="showDialog" @alterClose="alterClose" :titleFlag="titleFlag"></Alter>
  </div>
</template>
<script>
import Alter from "../formApplication/componets/Alter.vue"
export default {
  components: { Alter },
  data() {
    return {
      showDialog: false,
      titleFlag: ""
    }
  },
  methods: {
    gotoBuy() {
      this.showDialog = true
      this.titleFlag='repaire'
    },
    alterClose() {
      this.showDialog = false
    },
    gotoDelate(){
      this.showDialog = true
      this.titleFlag='delate'
    }
  },
}
</script>
<style lang="scss" scoped>
.top {
  border: solid 1px;
  height: 100px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.mid {
  border: solid 1px;
  background-color: cornsilk;
  height: 500px;
  margin-top: 10px;
  .title {
    background-color: rgb(161, 216, 216);
    height: 50px;
    display: flex;
    align-items: center;
    padding-left: 20px;
  }
  .boxes {
    display: flex;
    .box-item {
      width: 150px;
      height: 80px;
      background: #ffffff;
      border: 1px solid #e6e6e6;
      box-sizing: border-box;
      box-shadow: 0px 4px 10px rgba(0, 117, 255, 0.2);
      border-radius: 4px;
      margin: 10px;
    }
  }
  .content-items {
    background-color: darkkhaki;
    border: 1px solid;
    .items {
      display: flex;
      margin: 0 20px;
      align-items: center;
      .items-left {
        margin-right: 50px;
      }
    }
  }
}
</style>
