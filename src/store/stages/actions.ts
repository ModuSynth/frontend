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
  }
}

export default actions;