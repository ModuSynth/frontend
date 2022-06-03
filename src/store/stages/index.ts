import state from './state';
import actions from './actions';
import mutations from './mutations';
import { IStageState } from './interfaces';
import MainState from '../utils/MainState';
import { Module } from 'vuex';

const stages: Module<IStageState, MainState> = {
    actions, mutations, state, namespaced: true
}

export default stages;