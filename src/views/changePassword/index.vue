<template>
  <div>
    <el-form :model="alterData" label-width="100px">
      <el-form-item label="旧密码">
        <el-input maxlength="50" placeholder="请输入" v-model.trim="alterData.password"></el-input>
      </el-form-item>
      <el-form-item label="新密码">
        <el-input maxlength="50" placeholder="请输入" v-model.trim="alterData.newPassword">
        </el-input>
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input maxlength="50" placeholder="请输入" v-model.trim="alterData.checkNewPassword"> </el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" class="add-button" @click="submitButton" plain>确定</el-button>
  </div>
</template>
<script>
import _service from "@/service"

export default {
  data() {
    return {
      alterData: {},
    }
  },
  methods: {
    submitButton() {
      let params = {
        userId: this.$store.state.userid,
        userPassword: this.alterData.password,
        newUserPassword: this.alterData.newPassword,
      }
      _service
        .rewritePassword(params)
        .then(() => {
          console.log(params,"params");
          this.$router.push("/")
           return this.$message({
            type: "success",
            message: "修改密码成功",
          })
        })
        .catch(() => {
           return this.$message({
            type: "error",
            message: "删除密码失败",
          })
        })
    },
  },
}
</script>
