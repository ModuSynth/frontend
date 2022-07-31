import { ActionTree } from "vuex";
import MainState from "../utils/MainState";
import { StageActionTypes, StageMutationTypes } from "./enums";
import { IStageState, StageActions } from "./interfaces";
import axios from "axios";
import { API_URL, AUDIO_CONTEXT, resetContext } from "@/utils/constants";
import { NodeActionTypes } from "../nodes/enums";
import { cloneDeep } from "lodash";

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
  },
  async [StageActionTypes.CREATE_CONTEXT]({ dispatch, state }) {
    console.log(AUDIO_CONTEXT?.state)
    resetContext().then(() => {
      while(AUDIO_CONTEXT.state !== 'running');
      dispatch(`nodes/${NodeActionTypes.FETCH_LIST}`, state.stage.id, {root: true})
    });
  }
}

export default actions;