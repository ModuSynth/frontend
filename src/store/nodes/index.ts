import { Module } from 'vuex';
import MainState from '../utils/MainState';
import { INodeState } from './interfaces';
import mutations from './mutations';
import state from './state';

const nodes: Module<INodeState, MainState> = {
  namespaced: true,
  mutations,
  state
}

export default nodes;