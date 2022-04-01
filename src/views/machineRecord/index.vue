<template>
  <div>
    <div class="section-one">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="设备名称">
          <el-select
            v-model="formInline.machineName"
            filterable
            placeholder="请输入"
            :clearable="true"
            @visible-change="getMachineName"
            
          >
            <el-option
              v-for="item in machineNameData"
              :key="item.machineId"
              :label="item.machineName"
              :value="item.machineId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备ID">
          <el-input v-model="formInline.machineId" placeholder="请输入内容" :clearable="true"></el-input>
        </el-form-item>
        <el-form-item label="设备类型">
          <el-select v-model="formInline.machineType" :clearable="true" placeholder="请选择">
            <el-option label="全部" value="0"></el-option>
            <el-option label="诊断设备类" value="1"></el-option>
            <el-option label="治疗设备类" value="2"></el-option>
            <el-option label="辅助设备类" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="操作类型">
          <el-select v-model="formInline.useType" :clearable="true" placeholder="请选择">
            <el-option label="全部" value="0"></el-option>
            <el-option label="使用" value="1"></el-option>
            <el-option label="维修" value="2"></el-option>
            <el-option label="报废" value="3"></el-option>
            <el-option label="购入" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="使用时间">
          <el-date-picker
            prefix-icon="null"
            v-model="formInline.datatime"
            type="datetimerange"
            :default-time="['00:00:00', '23:59:59']"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-button class="margin-bottom12 margin-left10" type="primary" @click="searchClick" plain
            >搜索</el-button
          >
        </el-form-item>
      </el-form>
      
    </div>
    <div class="section-two">
      <el-table :data="machineListData" border stripe>
      <el-table-column type="index" label="序号" width="100"></el-table-column>
      <el-table-column label="设备名" prop="machineName" width="200"></el-table-column>
      <el-table-column width="100" prop="machineId" label="设备Id"></el-table-column>
      <el-table-column prop="machineType" label="所属类型" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if="scope.row.machineType == '1'">诊断设备类</span>
              <span v-if="scope.row.machineType == '2'">治疗设备类</span>
              <span v-if="scope.row.machineType == '3'">辅助设备类</span>
            </template>
          </el-table-column>
      <el-table-column prop="useType" width="100" label="操作类型">
            <template slot-scope="scope">
              <span v-if="scope.row.useType == '1'">使用</span>
              <span v-if="scope.row.useType == '2'" class="warn-color">维修</span>
              <span v-if="scope.row.useType == '3'" class="warn-color">报废</span>
              <span v-if="scope.row.useType == '4'" class="warn-color">购入</span>
            </template>
          </el-table-column>
      <el-table-column label="操作人员" prop="username" width="200"> </el-table-column>
      <el-table-column label="操作开始时间" prop="startTime" fixed="right" show-overflow-tooltip> </el-table-column>
      <el-table-column label="操作结束时间" prop="endTime" fixed="right" show-overflow-tooltip> </el-table-column>
    </el-table>
    </div>
    
  </div>
</template>
<script>
import _service from "@/service"
export default {
  name: "Index",
  data () {
    return {
      formInline: {
        machineName: "",
        machineId:"",
        machineType: "",
        status: "",
        datatime: "",
      },
      machineListData: [],
      machineNameData:[],
    }
  },
  created() {
    this.getMachineList()
    console.log(this.$store.state.permission, "111")
  },
  methods: {
    searchClick() {
      this.isSearch = true
      this.getMachineList()
    },
     getMachineList() {
      let params = {
        MachineId: "",
        machineName: "",
        machineType: "",
        useType:"",
        machineStatus: "",
        startTime: "",
        endTime: "",
        pageNum: "",
        pageSize: "",
      }
      this.tableloading = true
      // params.pageNum = this.currentPage
      // params.pageSize = this.size
      if (this.isSearch) {
        params.MachineId = this.formInline.machineName
        params.useType = this.formInline.useType
        params.machineId=this.formInline.machineId
        console.log(this.formInline.machineName, "this.formInline.machineName")
        // if (params.projectId || params.businessId) {
        //   params.pageNum = 1
        // }
        this.formInline.machineStatus === "0"
          ? (params.machineStatus = "")
          : (params.machineStatus = this.formInline.machineStatus)

        this.formInline.machineType === "0"
          ? (params.machineType = "")
          : (params.machineType = this.formInline.machineType)

        if (Array.isArray(this.formInline.datatime) && this.formInline.datatime.length > 0) {
          params.startTime = this.formInline.datatime[0]
          params.endTime = this.formInline.datatime[1]
        }
      }
      _service
        .getMachineList(params)
        .then((res) => {
          this.tableloading = false
          this.machineListData = res.data
          console.log(this.machineListData, "this.machineListData")
        })
        .catch((err) => {
          console.log("失败", err)
        })
    },
     //获取设备名称
    getMachineName() {
      _service
        .getMachineName({
          key: "",
        })
        .then((res) => {
          this.machineNameData = res.data
          console.log(this.machineNameData, "this.machineNameData")
        })
        .catch((err) => {
          this.status = true
          console.log("失败", err)
        })
    },
  }
}
</script>
<style lang="scss" scoped>
.section-one{
  min-width: 500px;
  background-color: #fbfbfb;
  margin-bottom: 15px;
  padding: 15px 20px 0 20px;
  display: flex;
}
.warn-color {
  color: red;
}
.useful-color {
  color: #409eff;
}

</style>
