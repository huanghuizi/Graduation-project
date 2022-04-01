<template>
  <div class="Login">
    <div>
      <img
        src="../assets/images/bgnew.png"
        class="loginbg"
      />
    </div>
    <div class="login-div">
      <img src="../assets/images/title.png" alt="" />
      <div class="formdiv">
        <div class="leftbg">
          <img src="../assets/images/left.png" style="height:95%" />
        </div>
        <div class="inputdiv">
          <div class="login-title">
            <div class="title-tab">账户登录</div>
          </div>
          <div class="input-box">
            <div class="tb_input">
              <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="姓名">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                  <el-input v-model="form.password" show-password></el-input>
                </el-form-item>

                <el-form-item>
                  <el-button type="primary" class="button-primary" @click="onSubmit" width="50px">
                    登录
                  </el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _service from '@/service'
// import { userLoginAPI } from "@/plugins/user.js"
export default {
  data() {
    return {
      form: {
        name: "",
        password: "",
      },
    }
  },

  methods: {
    onSubmit() {
      _service.login({
        username: this.form.name,
        userPassword: this.form.password,
      }).then((res) => {
        if (res.data.code == 1)
        {
          this.$router.push("/machineMangement")
          this.$store.commit('SET_NAME', res.data.userName);
          this.$store.commit('SET_ID', res.data.userId);
          this.$store.commit('SET_PERMISSION', res.data.permission);
          console.log(this.$store.getters,"sss")
          console.log(res.data,"res.data.userId")
        } 
        else
          this.$message({
            message: "登录失败",
            type: "warning",
          })
        console.log(res)
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.Login {
  .loginbg {
    position: relative;
  }
  .login-div {
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    width: 840px;
    height: 780px;
    .formdiv {
      width: 100%;
      height: 68%;
      margin-top: 8%;
      position: relative;
      .leftbg {
        height: 100%;
        position: absolute;
        left: 0;
        top: 24px;
      }
      .inputdiv {
        width: 55%;
        height: 100%;
        position: absolute;
        right: 0;
        bottom: 0;
        background: url(../assets/images/loginboxbg.png);
        background-size: 100% 100%;
        .login-title {
          font-size: 18px;
          line-height: 72px;
          width: 100%;
          font-weight: 700;
          cursor: pointer;
          .title-tab {
            width: 35%;
            float: left;
            text-align: center;
            color: #5e6b7e;
          }
        }
        .input-box {
          width: 100%;
          height: 90%;
          position: absolute;
          bottom: 0;
          left: 0;
          padding: 12% 18%;
          .tb_input {
            padding-top: 200px;
            width: 300px;
            .button-primary {
              background-color: #32ae57;
              border-color: #32ae57;
            }
          }
        }
      }
    }
  }
}

// .form_request {
//   background-color: rgba(121, 109, 109, 0.267);
//   min-width: 360px;
//   margin: 50px 50px 50px 500px;
//   position: absolute;
// }
</style>
