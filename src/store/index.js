import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username:"",
    permission:"",
    userid:"",
    machineId:""
  },
  mutations: {
    SET_NAME (state, paylod) {
      state.username = paylod;
    },
    SET_ID (state, paylod) {
      state.userid = paylod;
    },
    SET_PERMISSION (state, paylod) {
      state.permission = paylod;
    },
    SET_MACHINEID(state, paylod) {
      state.machineId = paylod;
    },
  },
  actions: {
    
  },
  getters:{
  },
  modules: {
  }
})
