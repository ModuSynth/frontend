import { Module } from 'vuex';
import MainState from '../utils/MainState';
import { INodeState } from './interfaces';
import mutations from './mutations';
import state from './state';
import actions from './actions'

const nodes: Module<INodeState, MainState> = {
  namespaced: true,
  mutations,
  state,
  actions
}

export default nodes;