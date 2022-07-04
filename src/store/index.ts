import Vue from 'vue'
import Vuex from 'vuex'
import stages from './stages'
import nodes from './nodes'
import links from './links'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { stages, links, nodes }
})
