<template>
  <div>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="用户名">
        <el-select v-model="formInline.userName" filterable placeholder="请输入" :clearable="true">
          <el-option
            v-for="item in userListData"
            :key="item.userId"
            :label="item.userName"
            :value="item.userId"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="身份">
        <el-select v-model="formInline.permission" :clearable="true" placeholder="请选择">
          <el-option label="全部" value="0"></el-option>
          <el-option label="超级管理员" value="1"></el-option>
          <el-option label="维修人员" value="2"></el-option>
          <el-option label="医生" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button class="margin-bottom12 margin-left10" type="primary" @click="searchClick" plain
          >搜索</el-button
        >
        <el-button type="primary" class="add-button" @click="showCreateUserAlter" plain
          >新增</el-button
        >
      </el-form-item>
    </el-form>

    <el-table :data="userListData" border stripe>
      <el-table-column type="index" label="序号" width="100"></el-table-column>
      <el-table-column
        label="用户ID"
        prop="userId"
        width="300"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column width="300" prop="userName" label="用户名"></el-table-column>
      <el-table-column label="身份" prop="permission" show-overflow-tooltip>
        <template slot-scope="scope">
          <span v-if="scope.row.permission == '1'">超级管理员</span>
          <span v-if="scope.row.permission == '2'">维修人员</span>
          <span v-if="scope.row.permission == '3'">医生</span>
          <span v-if="scope.row.permission == '4'">医院高级领导</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="400">
        <template slot-scope="scope">
          <el-button type="text" @click="showDeleteDialog(scope.row)">离职</el-button>
          <el-button type="text" @click="showUpdateDialog(scope.row)">更改权限</el-button>
          <el-button type="text" @click="showResetDialog(scope.row)">重置密码</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="提示" :visible.sync="deleteAlter" width="30%">
      <span>确认注销该用户账号？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteAlter = false">取 消</el-button>
        <el-button type="primary" @click="deleteEvent">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改权限 -->
    <el-dialog title="提示" :visible.sync="updateAlter" width="30%">
      <el-form label-width="80px" :model="form">
        <el-form-item label="用户名">
          <el-input disabled v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="权限修改">
          <el-select placeholder="请选择权限" v-model="form.permission">
            <el-option label="超级管理员" value="1"></el-option>
            <el-option label="维修人员" value="2"></el-option>
            <el-option label="医生" value="3"></el-option>
            <el-option label="医院高级领导" value="4"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updateAlter = false">取 消</el-button>
        <el-button type="primary" @click="updateEvent">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 重置密码 -->
    <el-dialog title="提示" :visible.sync="resetAlter" width="30%">
      <span>确认要重置密码吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetAlter = false">取 消</el-button>
        <el-button type="primary" @click="resetEvent">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 新增用户 -->
    <el-dialog title="新增用户" :visible.sync="createUser" @close="cancelEvent" width="464px">
      <!-- <el-form :model="alterData" label-width="100px" :rules="createRules" ref="ruleForm">
        <el-form-item label="用户名" prop="name">
          <el-input maxlength="10" placeholder="请输入" v-model.trim="alterData.name"> </el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input maxlength="20" placeholder="请输入" v-model.trim="alterData.password"> </el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input maxlength="20" placeholder="请输入" v-model.trim="alterData.surepassword">
          </el-input>
        </el-form-item>
        <el-form-item label="身份" prop="permission">
          <el-select v-model.trim="alterData.permission" placeholder="请选择身份">
            <el-option label="超级管理员" value="1"></el-option>
            <el-option label="维修人员" value="2"></el-option>
            <el-option label="医生" value="3"></el-option>
            <el-option label="医院高级领导" value="4"></el-option>
          </el-select>
        </el-form-item>
      </el-form> -->
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        ><el-form-item label="用户名" prop="name">
          <el-input v-model.number="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="身份" prop="permission">
          <el-select v-model.trim="alterData.permission" placeholder="请选择身份" >
            <el-option label="超级管理员" value="1"></el-option>
            <el-option label="维修人员" value="2"></el-option>
            <el-option label="医生" value="3"></el-option>
            <el-option label="医院高级领导" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="cancelEvent">取消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import _service from "@/service"

export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"))
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass")
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"))
      } else {
        callback()
      }
    }
    return {
      isSearch: false,
      deleteAlter: false,
      resetAlter: false,
      createUser: false,
      updateAlter: false,
      activeUserId: "",
      formInline: {
        userName: "",
        userId: "",
        permission: "",
      },
      alterData: {},
      userListData: [],
      form: {
        name: "",
        permission: "",
      },
      // userId: 1,
      ruleForm: {
        pass: "",
        checkPass: "",
        name: "",
        permission:"",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        permission:[{ message: '请选择身份', trigger: 'change' }]
      },
      // createRules: {
      //   name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
      //   pass: [{ required: true, trigger: "blur", validator: validatePass }],
      //   checkPass: [{ required: true, trigger: "blur", validator: validatePass2 }],
      //   permission: [{ type: "date", required: true, message: "请选择时间", trigger: "change" }],
      // },
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = {
            userName: this.alterData.name,
            userPassword: this.alterData.password,
            permission: this.alterData.permission,
          }
          _service
            .insertUser(params)
            .then(() => {
              this.createUser = false
              this.getUserList()
              return this.$message({
                type: "success",
                message: "新增成功",
              })
            })
            .catch(() => {
              return this.$message({
                type: "error",
                message: "新增失败",
              })
            })
        } else {
          console.log("error submit!!")
          return false
        }
      })
    },
    //获取用户列表
    getUserList() {
      let params = {
        userId: "",
        permission: "",
      }
      this.tableloading = true
      if (this.isSearch) {
        params.userId = this.formInline.userName
        params.permission = this.formInline.permission
      }
      _service
        .getUserList(params)
        .then((res) => {
          this.tableloading = false
          this.userListData = res.data
          console.log(this.userListData, "this.userListData")
        })
        .catch((err) => {
          console.log("失败", err)
        })
    },
    //搜索用户
    searchClick() {
      this.isSearch = true
      this.getUserList()
    },
    //删除用户
    showDeleteDialog(row) {
      this.deleteAlter = true
      this.activeUserId = row.userId
    },
    deleteEvent() {
      let params = {
        userId: this.activeUserId,
      }
      _service
        .deleteUser(params)
        .then(() => {
          console.log(params, "params")
          this.deleteAlter = false
          this.getUserList()
          return this.$message({
            type: "success",
            message: "删除成功",
          })
        })
        .catch((err) => {
          return this.$message({
            type: "error",
            message: "删除失败",
          })
        })
    },
    //修改权限
    showUpdateDialog(row) {
      this.updateAlter = true
      this.activeUserId = row.userId
      this.form.name = row.userName
      if (row.permission === 1) this.form.permission = "超级管理员"
      if (row.permission === 2) this.form.permission = "维修人员"
      if (row.permission === 3) this.form.permission = "医生"
    },
    updateEvent() {
      let params = {
        userId: this.activeUserId,
        permission: this.form.permission,
      }
      _service
        .updatePermission(params)
        .then(() => {
          this.updateAlter = false
          this.getUserList()
          return this.$message({
            type: "success",
            message: "修改权限成功",
          })
        })
        .catch((err) => {
          return this.$message({
            type: "error",
            message: "修改权限失败",
          })
        })
    },
    //重置密码
    showResetDialog(row) {
      this.resetAlter = true
      this.activeUserId = row.userId
    },
    resetEvent() {
      let params = {
        userId: this.activeUserId,
      }
      _service
        .resetPassword(params)
        .then(() => {
          this.resetAlter = false
          return this.$message({
            type: "success",
            message: "重置成功",
          })
        })
        .catch((err) => {
          return this.$message({
            type: "error",
            message: "重置失败",
          })
        })
    },
    //新增用户
    showCreateUserAlter() {
      this.createUser = true
    },
    createUserEvent() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          let params = {
            userName: this.alterData.name,
            userPassword: this.alterData.password,
            permission: this.alterData.permission,
          }
          _service
            .insertUser(params)
            .then(() => {
              this.createUser = false
              this.getUserList()
              return this.$message({
                type: "success",
                message: "新增成功",
              })
            })
            .catch(() => {
              return this.$message({
                type: "error",
                message: "新增失败",
              })
            })
        } else {
          console.log("校验失败")
          return false
        }
      })
    },
    resetForm(formName) {
      this.createUser = false
        this.$refs[formName].resetFields();
      },
    cancelEvent() {
      this.createUser = false
      this.$refs.ruleForm.resetFields()
    },
  },
}
</script>
<style scoped>
.demo-form-inline {
}
</style>
