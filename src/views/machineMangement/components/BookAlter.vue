<template>
  <el-dialog title="预约使用" :visible="isShowDialog" width="804px" @close="bookAlterClose">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="用户管理" name="first"></el-tab-pane>
      <el-tab-pane label="用户管理" name="second"></el-tab-pane>
      <el-tab-pane label="用户管理" name="third"></el-tab-pane>
    </el-tabs>
    <div class="box">
      8:00-9:00
    </div>
    <el-form :model="activeRowData" label-width="100px">
      <el-form-item>
        <h1>该设备已被预约时间</h1>
        <el-table :data="BookRecordList" style="width: 100%">
          <el-table-column prop="startTime" label="预约开始时间"> </el-table-column>
          <el-table-column prop="endTime" label="预约结束时间"> </el-table-column>
        </el-table>
      </el-form-item><el-form-item>
        <div class="block">
          <span class="demonstration">预约时间</span>
          <el-date-picker
            v-model="value1"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item label="设备名称">
        <el-input
          maxlength="50"
          placeholder="请输入"
          v-model.trim="activeRowData.machineName"
        ></el-input>
      </el-form-item>
      <el-form-item label="设备ID">
        <el-input maxlength="10" placeholder="请输入" v-model.trim="activeRowData.machineId">
        </el-input>
      </el-form-item>
      
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="bookAlterClose()">取消</el-button>
      <el-button type="primary" size="small" @click="submitButtonClick">确定 </el-button>
    </div>
  </el-dialog>
</template>
<script>
import _service from "@/service"
var moment = require("moment")
moment().format()
export default {
  props: {
    isShowDialog: {
      type: Boolean,
      default: false,
    },
    activeRowData: {
      type: Object,
    },
  },
  data() {
    return {
      BookRecordList: [],
      value1: "",
      activeName: "second",
    }
  },
  created() {
    this.getBookRecordList()
    // this.getdate()
    console.log("111")
  },
  methods: {
    bookAlterClose() {
      this.$emit("bookAlterClose")
    },
    submitButtonClick() {
      this.$emit("createMachine", this.alterData)
    },
    getBookRecordList() {
      let params = {
        machineId: this.activeRowData.machineId,
      }
      _service
        .bookRecords(params)
        .then((res) => {
          this.BookRecordList = res.data
          console.log("this.BookRecordList", this.BookRecordList)
        })
        .catch((err) => {
          console.log(err, "错误")
        })
    },
    // getdate() {
    //   // var mydate = new Date()
    //   for (var i = 1; i < 6; i++) {
    //     var endtime = moment(endtime)
    //       .add(1, "days")
    //       .format("MM-DD")
    //     console.log(endtime, "endtime")
    //   }
    // },
    // handleClick(tab, event) {
    //   console.log(tab, event)
    // },
  },
}
</script>
<style>
.is-selected {
  color: #1989fa;
}
.box {
  border: chartreuse 1px solid;
  background: cyan;
  font-size: 12px;
  width: 60px;
  height: 50px;
}
</style>
