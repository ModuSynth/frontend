import { Module } from 'vuex';
import MainState from '../utils/MainState';
import { ILinkState } from './interfaces';
import mutations from './mutations';
import state from './state';
import actions from './actions'

const links: Module<ILinkState, MainState> = {
  namespaced: true,
  mutations,
  state,
  actions
}

export default links;