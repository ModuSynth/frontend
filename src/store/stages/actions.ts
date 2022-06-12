import { ActionTree } from "vuex";
import MainState from "../utils/MainState";
import { StageActionTypes, StageMutationTypes } from "./enums";
import { IStageState, StageActions } from "./interfaces";
import axios from "axios";
import { NodeMutationTypes } from "../nodes/enums";

const actions: ActionTree<IStageState, MainState> & StageActions = {
  [StageActionTypes.FETCH_LIST]({ commit }) {
    return axios.get("http://localhost:3000/stages").then(({ data }) => {
      commit(StageMutationTypes.SET_LIST, data);
    });
  },
  [StageActionTypes.FETCH_ONE]({ commit }, stageId) {
    return axios.get(`http://localhost:3000/stages/${stageId}`).then(({ data }) => {
      commit(StageMutationTypes.SET_DETAILS, data);
      commit(`nodes/${NodeMutationTypes.SET_NODES_LIST}`, data.nodes, { root: true });
    });
  },
  [StageActionTypes.CREATE]({ commit }, payload) {
    return axios.post('http://localhost:3000/stages', payload).then((response) => {
      payload.id = response.data.id;
      commit(StageMutationTypes.ADD_STAGE, payload);
    })
  }
}

export default actions;