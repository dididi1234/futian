import Vue from  'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

let mapState = Vuex.mapState;
let mapMutatons = Vuex.mapMutations;

let state = {
  cityName:'上海',
  foodListId:[],
  isOnline:false,
  countAll:sessionStorage.getItem('countAll')?sessionStorage.getItem('countAll'):0
}

let mutations = {
  change (state,city) {
    state.cityName = city
  },
  setInfo(state,infoF){
    state.foodListId = infoF
  },
  isLogin(state){
    state.isOnline = true;
  },
  getCountAll(state,count){
    state.countAll = count;
  }
}

export default new Vuex.Store({
  state,
  mutations
})
export  {
  mapState,
  mapMutatons
}
