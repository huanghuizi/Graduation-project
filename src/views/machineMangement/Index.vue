<template>
  <div>
    <div style="margin-top:10px">
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
          <el-form-item label="设备类型">
            <el-select v-model="formInline.machineType" :clearable="true" placeholder="请选择">
              <el-option label="全部" value="0"></el-option>
              <el-option label="诊断设备类" value="1"></el-option>
              <el-option label="治疗设备类" value="2"></el-option>
              <el-option label="辅助设备类" value="3"></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="状态">
            <el-select v-model="formInline.machineStatus" :clearable="true" placeholder="请选择">
              <el-option label="全部" value="0"></el-option>
              <el-option label="空闲" value="5"></el-option>
              <el-option label="正在使用" value="1"></el-option>
              <el-option label="维修中" value="2"></el-option>
              <el-option label="故障" value="3"></el-option>
              <el-option label="已报修" value="4"></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item>
            <el-button
              class="margin-bottom12 margin-left10"
              type="primary"
              @click="searchClick"
              plain
              >搜索</el-button
            >
          </el-form-item>
        </el-form>
        <el-button
          v-show="$store.state.permission === 4"
          type="primary"
          class="add-button"
          @click="showCreateProjectAlter"
          plain
          >设备入库</el-button
        >
      </div>
      <div class="section-two">
        <el-table :data="machineListData" border stripe>
          <el-table-column type="index" label="序号" width="50"></el-table-column>
          <el-table-column
            prop="machineName"
            label="设备名称"
            width="200"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="machineId" width="150" label="设备ID"></el-table-column>
          <el-table-column prop="machineType" label="所属类型" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if="scope.row.machineType == '1'">诊断设备类</span>
              <span v-if="scope.row.machineType == '2'">治疗设备类</span>
              <span v-if="scope.row.machineType == '3'">辅助设备类</span>
            </template>
          </el-table-column>
          <el-table-column prop="machineStatus" width="100" label="状态">
            <template slot-scope="scope">
              <span v-if="scope.row.machineStatus == '5'" class="useful-color">空闲</span>
              <span v-if="scope.row.machineStatus == '1'">正在使用</span>
              <span v-if="scope.row.machineStatus == '2'" class="warn-color">维修中</span>
              <span v-if="scope.row.machineStatus == '3'" class="warn-color">故障</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" width="230">
            <template slot-scope="scope">
              <el-button
                v-show="$store.state.permission === 1"
                type="text"
                @click="gotoDetail(scope.row)"
                >查看使用记录</el-button
              >
              <el-button
                v-show="$store.state.permission === 3"
                type="text"
                @click="userEvent(scope.row)"
                >使用</el-button
              >
              <el-button
                v-show="$store.state.permission === 3"
                type="text"
                @click="stopEvent(scope.row)"
                >停用</el-button
              >
              <!-- <el-button
                v-show="$store.state.permission === 3"
                type="text"
                @click="showRepaireDialog(scope.row)"
                >报修</el-button
              > -->
              <el-button
                v-show="$store.state.permission === 2"
                type="text"
                @click="repaireEvent(scope.row)"
                >维修</el-button
              >
              <el-button
                v-show="$store.state.permission === 2"
                type="text"
                @click="showOverDialog(scope.row)"
                >维修成功</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <Alter
          :isShowDialog="showDialog"
          @createMachine="createMachine"
          @alterClose="alterClose"
        ></Alter>
        <!-- <BookAlter
          :isShowDialog="showBookAlter"
          :activeRowData="activeRowData"
          @bookMachine="bookMachine"
          @bookAlterClose="bookAlterClose"
        >
        </BookAlter> -->

        <!-- <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
          <span>确认要删除吗？</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="deleteEvent">确 定</el-button>
          </span>
        </el-dialog> -->
        <el-dialog title="提示" :visible.sync="showRepaireOverVisible" width="30%">
          <span>确认设备维修成功？</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="showRepaireOverVisible = false">取 消</el-button>
            <el-button type="primary" @click="repaireOverEvent">确 定</el-button>
          </span>
        </el-dialog>
        <el-dialog title="提示" :visible.sync="showScrapping" width="30%">
          <span>请填写报废理由？</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="showScrapping = false">取 消</el-button>
            <el-button type="primary" @click="scrappingEvent">确 定</el-button>
          </span>
        </el-dialog>
        <!-- <el-dialog title="提示" :visible.sync="repaireDialogVisible" width="30%">
          <el-form :model="repairData" label-width="100px">
            <el-form-item label="设备名称">
              <el-input
                maxlength="50"
                placeholder="请输入"
                v-model.trim="repairData.name"
              ></el-input>
            </el-form-item>
            <el-form-item label="设备ID">
              <el-input maxlength="10" placeholder="请输入" v-model.trim="repairData.id">
              </el-input>
            </el-form-item>
            <el-form-item label="报修原因">
              <el-input maxlength="10" placeholder="请输入" v-model.trim="repairData.reason">
              </el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="repaireDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="commitRapaire">确 定</el-button>
          </span>
        </el-dialog> -->
        <!-- <el-pagination
        class="pages"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="size"
        layout="total, sizes, prev, pager, next"
        :total="projectListData.total"
      >
      </el-pagination> -->
      </div>
    </div>
  </div>
</template>
<script>
import _service from "@/service"
import Alter from "./components/Alter.vue"
import BookAlter from "./components/BookAlter.vue"
export default {
  components: { Alter, BookAlter },
  name: "Index",
  computed: {},
  data() {
    return {
      formInline: {
        machineName: "",
        machineType: "",
        status: "",
        datatime: "",
      },
      status: "", //用来监测 此次点击之后，想要修改的状态
      showDialog: false,
      showBookAlter: false, //控制预约使用弹窗
      // dialogVisible: false,
      repaireDialogVisible: false,
      showRepaireOverVisible: false,
      showScrapping: false,
      activeMachineId: "",
      machineNameData: {}, //下拉框设备名称
      machineListData: [],
      activeRowData: {
        machineName: "",
        machineId: "",
      }, //当前row的数据
      repairData: {}, //申请报修数据
    }
  },
  created() {
    this.getMachineList()
    console.log(this.$store.state.permission, "111")
  },
  methods: {
    getMachineList() {
      let params = {
        machineId: "",
        machineType: "",
        pageNum: "",
        pageSize: "",
      }
      this.tableloading = true
      // params.pageNum = this.currentPage
      // params.pageSize = this.size
      if (this.isSearch) {
        params.machineId = this.formInline.machineName
        console.log(this.formInline.machineName, "this.formInline.machineName")
        // if (params.projectId || params.businessId) {
        //   params.pageNum = 1
        // }
        this.formInline.machineStatus === "0"
          ? (params.machineStatus = "")
          : (params.machineStatus = this.formInline.machineStatus)

        if (Array.isArray(this.formInline.datatime) && this.formInline.datatime.length > 0) {
          params.startTime = this.formInline.datatime[0]
          params.endTime = this.formInline.datatime[1]
        }
      }
      _service
        .getMachineName(params)
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

    //点击搜索按钮
    searchClick() {
      this.isSearch = true
      this.getMachineList()
    },

    //显示新增弹窗
    showCreateProjectAlter() {
      this.showDialog = true
    },
    createMachine(alterData) {
      let params = {
        machineName: alterData.name,
        machineId: alterData.id,
        machineType: alterData.type,
      }
      _service
        .createMachine(params)
        .then((res) => {
          if (res !== 0) {
            this.showDialog = false
            this.getMachineList()
          }
        })
        .catch((err) => {
          console.log(err, "错误")
        })
    },

    //医生点击预约使用
    userEvent(row) {
      this.status = 1
      var myDate=new Date()
      console.log(row, "row")
      console.log(myDate,"myDate");
      if (row.machineStatus === 5) {
        let params = {
          machineId: row.machineId,
          status: this.status,
        }
        _service
          .rewriteMachine(params)
          .then(() => {
            this.getMachineList()
          })
          .catch((err) => {
            console.log(err, "错误")
          })
        let information = {
          machineName: row.machineName,
          machineId: row.machineId,
          machineType: row.machineType,
          useType: "1",
          username: this.$store.state.username,
          startTime:myDate
        }
        _service
          .insertRecords(information)
          .then(() => {
            console.log(information,"information");
            this.getMachineList()
          })
          .catch((err) => {
            console.log(err, "错误")
          })
      } else {
        return this.$message({
          type: "warning",
          message: "该设备现在不可用",
        })
      }
    },
    bookMachine() {},
    //医生点击停用
    stopEvent(row) {
      this.status = 5
      if (row.machineStatus === 1) {
        let params = {
          machineId: row.machineId,
          status: this.status,
        }
        _service
          .rewriteMachine(params)
          .then(() => {
            this.getMachineList()
          })
          .catch((err) => {
            console.log(err, "错误")
          })
      } else {
        return this.$message({
          type: "warning",
          message: "该设备未在使用",
        })
      }
    },
    //医生点击报修
    // showRepaireDialog(row) {
    //   if (row.machineStatus === 5) {
    //     this.repaireDialogVisible = true
    //     this.activeMachineId = row.machineId
    //     this.status = 3
    //   } else {
    //     return this.$message({
    //       type: "warning",
    //       message: "请先停止使用再报修",
    //     })
    //   }
    // },
    // commitRapaire() {
    //   let params = {
    //     machineId: this.activeMachineId,
    //     status: this.status,
    //   }
    //   _service
    //     .rewriteMachine(params)
    //     .then(() => {
    //       this.repaireDialogVisible = false
    //       this.getMachineList()
    //     })
    //     .catch((err) => {
    //       console.log(err, "错误")
    //     })
    // },

    //维修人员点击维修
    repaireEvent(row) {
      this.status = 2
      if (row.machineStatus === 3) {
        let params = {
          machineId: row.machineId,
          status: this.status,
        }
        _service
          .rewriteMachine(params)
          .then(() => {
            this.getMachineList()
          })
          .catch((err) => {
            console.log(err, "错误")
          })
      } else {
        return this.$message({
          type: "warning",
          message: "该设备不需要维修",
        })
      }
    },
    //维修人员点击维修成功
    showOverDialog(row) {
      if (row.machineStatus === 2) {
        this.showRepaireOverVisible = true
        this.activeMachineId = row.machineId
      } else {
        return this.$message({
          type: "warning",
          message: "该设备不在维修中",
        })
      }
    },
    repaireOverEvent() {
      let params = {
        machineId: this.activeMachineId,
        status: 5,
      }
      _service
        .rewriteMachine(params)
        .then(() => {
          ;(this.showRepaireOverVisible = false), this.getMachineList()
        })
        .catch((err) => {
          console.log(err, "错误")
        })
    },
    //维修人员点击申请报废
    showScrappingDialog() {
      this.showScrapping = true
    },
    scrappingEvent() {},

    gotoDetail(row) {
      // this.dialogVisible = true
      this.activeMachineId = row.machineId

      // this.$store.commit("SET_MACHINEID", this.activeMachineId)
      this.$router.push({
        name: "machineUseDetail",
        query: { activeMachineId: this.activeMachineId },
      })
    },
    //设备管理员点击删除设备
    // deleteEvent() {
    //   let params = {
    //     machineId: this.activeMachineId,
    //   }
    //   _service
    //     .deleteMachine(params)
    //     .then(() => {
    //       this.dialogVisible = false
    //       this.getMachineList()
    //     })
    //     .catch((err) => {
    //       console.log(err, "错误")
    //     })
    // },
    //弹窗关闭
    alterClose() {
      this.showDialog = false
    },
    bookAlterClose() {
      this.showBookAlter = false
    },
  },
}
</script>

<style lang="scss" scoped>
.section-one {
  min-width: 500px;
  background-color: #fbfbfb;
  margin-bottom: 15px;
  padding: 15px 20px 0 20px;
  display: flex;
}
.add-button {
  height: 40px;
}
.demo-form-inline {
  width: 1600px;
}
.section-two {
  min-width: 500px;
}
::v-deep.el-table .cell {
  text-align: center;
}
.warn-color {
  color: red;
}
.useful-color {
  color: #409eff;
}
.pages {
  float: right;
}
::v-deep .el-pagination {
  margin-top: 10px !important;
}
::v-deep .el-select {
  margin-top: -4px;
}
:v-deep .el-pagination .el-select .el-input {
  margin: -6px 5px 0px 5px !important;
}
</style>
