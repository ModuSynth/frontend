import { ActionTree } from "vuex";
import MainState from "../utils/MainState";
import { StageActionTypes, StageMutationTypes } from "./enums";
import { IStageState, StageActions } from "./interfaces";
import axios from "axios";
import { API_URL } from "@/utils/constants";

const actions: ActionTree<IStageState, MainState> & StageActions = {
  [StageActionTypes.FETCH_LIST]({ commit }) {
    return axios.get(`${API_URL}/stages`).then(({ data }) => {
      commit(StageMutationTypes.SET_LIST, data);
    });
  },
  [StageActionTypes.FETCH_ONE]({ commit }, stageId) {
    return axios.get(`${API_URL}/stages/${stageId}`).then(({ data }) => {
      commit(StageMutationTypes.SET_DETAILS, data);
    });
  },
  [StageActionTypes.CREATE]({ commit }, payload) {
    return axios.post('${API_URL}/stages', payload).then((response) => {
      payload.id = response.data.id;
      commit(StageMutationTypes.ADD_STAGE, payload);
    })
  },
  [StageActionTypes.SAVE_POSITION]({ state }) {
    return axios.patch(`${API_URL}/stages/${state.stage.id}`, state.stage).then(() => {
      state.dragging = false;
    })
  }
}

export default actions;