import Vue from 'vue'
import Vuex from 'vuex'
import stages from './stages'
import nodes from './nodes'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { stages, nodes }
})
