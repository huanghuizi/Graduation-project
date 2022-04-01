<template>
  <div class="Register">
    <h2>这是Login传过来的参数{{ID}}</h2>
    <div class="left_img">
      <!-- <img src="~@/assets/images/logo.png" > -->

    </div>
    <div class="right_request">
        <div class="tb_input">
          <el-form ref="form"
                   :model="form"
                   label-width="70px">
            <el-form-item label="手机号">
              <el-input v-model="form.num"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="form.password"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary"
                         @click="onSubmit">
                <router-link to="/Login">立即创建</router-link>
              </el-button>
            </el-form-item>
          </el-form>
        </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        num: '',
        password: ''
      }
    }
  },
  computed:{
    ID(){
      return this.$route.params.Id
    }

  },

  methods: {
    onSubmit() {
      
    }
  }
}
</script>
<style>
/* .Register {
  display: flex;
  width: 500px;
  height: 300px;
  padding: 50px 50px 50px 500px;
  background-image: url(../assets/images/confirmBack.png);
}
.left_img {
  background-color: aqua;
  width: 100%;
}
.right_request {
  background-color: gray;
  width: 130%;
} */
.tb_input {
  padding-top: 100px;
  width: 90%;
}




</style>