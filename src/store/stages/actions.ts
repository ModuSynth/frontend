import { ActionTree } from "vuex";
import MainState from "../utils/MainState";
import { StageActionTypes, StageMutationTypes } from "./enums";
import { IStageState, StageActions } from "./interfaces";
import axios from "axios";
import { NodeMutationTypes } from "../nodes/enums";
import ICoordinates from "@/interfaces/utils/ICoordinates";
import stages from ".";

const actions: ActionTree<IStageState, MainState> & StageActions = {
  [StageActionTypes.FETCH_LIST]({ commit }) {
    return axios.get("http://localhost:3000/stages").then(({ data }) => {
      commit(StageMutationTypes.SET_LIST, data);
    });
  },
  [StageActionTypes.FETCH_ONE]({ commit }, stageId) {
    return axios.get(`http://localhost:3000/stages/${stageId}`).then(({ data }) => {
      commit(StageMutationTypes.SET_DETAILS, data);
    });
  },
  [StageActionTypes.CREATE]({ commit }, payload) {
    return axios.post('http://localhost:3000/stages', payload).then((response) => {
      payload.id = response.data.id;
      commit(StageMutationTypes.ADD_STAGE, payload);
    })
  },
  [StageActionTypes.SAVE_POSITION]({ commit, state }) {
    return axios.patch(`http://localhost:3000/stages/${state.stage.id}`, state.stage).then(() => {
      state.dragging = false;
    })
  }
}

export default actions;