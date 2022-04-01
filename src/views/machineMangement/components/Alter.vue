<template>
  <el-dialog
    title="新增设备"
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
      <el-form-item label="设备类型">
        <el-select v-model.trim="alterData.type" placeholder="请选择设备类型">
          <el-option label="诊疗设备" value="1"></el-option>
          <el-option label="治疗设备" value="2"></el-option>
          <el-option label="辅助设备" value="3"></el-option>
        </el-select>
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
  },
  data() {
    return {
      alterData: {},
    //   ruleForm: {
    //   type: Object,
    //   default() {
    //     return {
    //       name: "",
    //       id: "",
    //       type: "",
    //     }
    //   },
    // },
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
