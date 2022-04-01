<template>
  <el-dialog
    :title="titleFlag === 'repaire' ? '维修申请单' : '报废申请单'"
    :visible="isShowDialog"
    width="464px"
    @close="alterClose"
  >
    <el-form :model="alterData" label-width="100px">
      <el-form-item label="设备名称">
        <el-input maxlength="50" placeholder="请输入" v-model.trim="alterData.name"></el-input>
      </el-form-item>
      <el-form-item label="设备ID">
        <el-input maxlength="10" placeholder="请输入" v-model.trim="alterData.id"> </el-input>
      </el-form-item>
      <el-form-item label="报修原因">
        <el-input maxlength="200" placeholder="请输入" v-model.trim="alterData.reason"> </el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="alterClose()">取消</el-button>
      <el-button type="primary" size="small" @click="submitButtonClick">确定 </el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: {
    isShowDialog: {
      type: Boolean,
      default: false,
    },
     titleFlag: {
      type: String,
      default: 'repaire'
    },
  },
  data() {
    return {
      alterData: {},
      titleFlag:"",
    }
  },
  methods: {
    alterClose() {
      this.$emit("alterClose")
      this.alterData={}
    },
    submitButtonClick() {
      this.$emit("createMachine", this.alterData)
    },
  },
}
</script>
