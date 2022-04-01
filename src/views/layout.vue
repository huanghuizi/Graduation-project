<template>
  <el-container style="height: 913px; border: 1px solid #eee">
    <el-aside width="250px" style="background-color: #657992">
      <!-- <img src="../assets/images/title.png" alt="" /> -->
      <div class="system-title">医疗设备管理系统</div>
      <el-menu>
        <el-menu-item index="1">
          <template slot="title">
            <div @click="goToSearch"><i class="el-icon-message"></i>设备查看</div>
          </template>
        </el-menu-item>
         <!-- v-show="this.$store.state.permission === 1" -->
        <el-menu-item index="2">
          <template slot="title">
            <div @click="gotoRecord"><i class="el-icon-message"></i>设备记录</div>
          </template>
        </el-menu-item>
        <el-menu-item index="3" v-show="this.$store.state.permission < 2">
          <template slot="title">
            <div @click="goToReWrite"><i class="el-icon-menu"></i>权限修改</div>
          </template>
        </el-menu-item>
        <el-menu-item
          index="4"
          v-show="this.$store.state.permission > 4 || this.$store.state.permission < 2"
        >
          <template slot="title">
            <div @click="goToAnlyse"><i class="el-icon-message"></i>数据分析</div>
          </template>
        </el-menu-item>
        <el-menu-item index="5" v-show="this.$store.state.permission > 1">
          <template slot="title">
            <div @click="goToForm"><i class="el-icon-message"></i>表单申请</div>
          </template>
        </el-menu-item>
        <el-menu-item index="6" v-show="this.$store.state.permission === 1">
          <template slot="title">
            <div @click="goToApprove"><i class="el-icon-message"></i>表单审批</div>
          </template>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item><div @click="quitEvent">退出登录</div></el-dropdown-item>
            <el-dropdown-item><div @click="changePasswordEvent">修改密码</div></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>{{ $store.state.username }}</span>
      </el-header>

      <el-main>
        <keep-alive>
          <router-view />
        </keep-alive>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "layout",
  data() {
    return {}
  },
  created() {
    if (sessionStorage.getItem("store")) {
      // 存储状态
      this.$store.replaceState(
        Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem("store")))
      )
    }
    // 在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload", () => {
      // session存储
      sessionStorage.setItem("store", JSON.stringify(this.$store.state))
    })
  },
  methods: {
    goToSearch() {
      console.log("machineMangement")
      this.$router.push("/machineMangement")
    },
    gotoRecord() {
      console.log("machineRecord")
      this.$router.push("/machineRecord")
    },
    goToReWrite() {
      this.$router.push("/userManagement")
      console.log("userManagement")
    },
    goToAnlyse() {
      this.$router.push("/informationAnalysis")
      console.log("informationAnalysis")
    },
    quitEvent() {
      this.$router.push("/")
      sessionStorage.clear() //清除所有session值
    },
    changePasswordEvent() {
      this.$router.push("/changePassword")
    },
    goToForm() {
      this.$router.push("/formApplication")
    },
    goToApprove() {
      this.$router.push("/toDoLists")
    },
  },
}
</script>

<style lang="scss" scoped>
.system-title {
  font-size: 20px;
  margin: 17px;
  color: rgba(214, 212, 195, 0.575);
}
.el-header {
  background-color: #657992;
  color: rgb(246, 240, 240);
  line-height: 60px;
}

.el-submenu__title i {
  color: #ffffff;
}
.el-dropdown {
  color: #ffffff;
}

.el-aside {
  color: #333;
}
.el-menu {
  background-color: #657992;
}
</style>
