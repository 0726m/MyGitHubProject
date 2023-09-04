import Vue from 'vue'
import Vuex from 'vuex'
import storage from '@/model/storage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 存储token
    token:"",
  },
  getters: {
    getToken(state){
      return state.token || storage.get("token") || "";
    }
  },
  mutations: {
     // 修改token，并将token存入localStorage
     setToken(state,token) {
      state.token = token;
      storage.set('token', token);
      console.log('store、localstorage保存token成功！');
    },
    delToken(state) {
      state.token = "";
      storage.remove("token");
    },
  },
  actions: {
  },
  modules: {
  }
})
