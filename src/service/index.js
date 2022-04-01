import _ from "@/utils"
import _api from "@/api.js"
import myAxios from "@/plugins/axios"

const _service = {
  //登录
  login(paramsList) {
    return myAxios({
      url: _api.login + _.queryEquipment(paramsList),
      method: "post",
    })
  },
  //获取记录
  getMachineList(paramsList) {
    return myAxios({
      url: _api.getRecord + _.queryEquipment(paramsList),
      method: "post",
    })
  },
  //获取设备名称
  getMachineName(paramsList) {
    return myAxios({
      url: _api.getMachineName + _.queryEquipment(paramsList),
      method: "post",
    })
  },
  //新增设备
  createMachine(paramsList) {
    return myAxios({
      url: _api.createMachine + _.queryEquipment(paramsList),
      method: "post",
    })
  },
  //删除设备
  deleteMachine(paramsList) {
    return myAxios({
      url: _api.deleteMachine + _.queryEquipment(paramsList),
      method: "post",
    })
  },
  //修改状态
  rewriteMachine(paramsList) {
    return myAxios({
      url: _api.rewriteMachine + _.queryEquipment(paramsList),
      method: "post",
    })
  },
  //获取用户列表
  getUserList(paramsList) {
    return myAxios({
      url: _api.getUserList + _.queryEquipment(paramsList),
      method: "post",
    })
  },
  //新增用户
  insertUser(paramsList) {
    return myAxios({
      url: _api.insertUser + _.queryEquipment(paramsList),
      method: "post",
    })
  },
  //删除用户
  deleteUser(paramsList) {
    return myAxios({
      url: _api.deleteUser + _.queryEquipment(paramsList),
      method: "post",
    })
  },
  //修改密码
  rewritePassword(paramsList) {
    return myAxios({
      url: _api.rewritePassword + _.queryEquipment(paramsList),
      method: "post",
    })
  },
  //重置密码
  resetPassword(paramsList) {
    return myAxios({
      url: _api.resetPassword + _.queryEquipment(paramsList),
      method: "post",
    })
  },
  updatePermission(paramsList) {
    return myAxios({
      url: _api.updatePermission + _.queryEquipment(paramsList),
      method: "post",
    })
  },
  bookRecords(paramsList) {
    return myAxios({
      url: _api.bookRecords + _.queryEquipment(paramsList),
      method: "post",
    })
  },
  insertRecords(paramsList) {
    return myAxios({
      url: _api.insertRecords + _.queryEquipment(paramsList),
      method: "post",
    })
  },
  
}

export default _service
