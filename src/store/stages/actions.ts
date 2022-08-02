import { ActionTree } from "vuex";
import MainState from "../utils/MainState";
import { StageActionTypes, StageMutationTypes } from "./enums";
import { IStageState, StageActions } from "./interfaces";
import axios from "axios";
import { API_URL, AUDIO_CONTEXT, resetContext } from "@/utils/constants";
import { NodeActionTypes } from "../nodes/enums";

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
  [StageActionTypes.CREATE]({ commit }, stageName) {
    const payload: any = {
      x: 0, y: 0, slots: 50, racks: 2, name: stageName
    }
    return axios.post(`${API_URL}/stages`, payload).then(({ data }) => {
      commit(StageMutationTypes.ADD_STAGE, data);
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