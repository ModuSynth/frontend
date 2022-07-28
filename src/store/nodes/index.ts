import { Module } from 'vuex';
import MainState from '../utils/MainState';
import { INodeState } from './interfaces';
import mutations from './mutations';
import state from './state';
import actions from './actions'
import getters from './getters'

const nodes: Module<INodeState, MainState> = {
  namespaced: true,
  mutations,
  state,
  actions,
  getters
}

export default nodes;