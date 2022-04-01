
const _apis = {
  // /api/login?userName=hhz&userPassword=123456
  login:'/api/login',//登录
  getMachineName: '/api/getMachineName',  //下拉框绑定设备名称
  getRecord: '/api/getRecord', //设备列表
  createMachine:'/api/createMachine', //新建设备
  deleteMachine:'/api/deleteMachine', //删除设备
  rewriteMachine:'/api/RewriteMachine',//修改设备状态
  getUserList:'/api/getUserList',//获取用户列表
  insertUser:'/api/insertUser',//删除用户
  deleteUser:'/api/deleteUser',//删除用户
  rewritePassword:'/api/reWritePassword',//修改密码
  resetPassword:'/api/reSetPasword',//重置密码
  updatePermission:'/api/updatePermission',//修改权限
  bookRecords:'/api/getBookRecords',//预约记录
  insertRecords:'/api/insertRecords',//插入记录

}
export default _apis