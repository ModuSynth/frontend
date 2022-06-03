import IStage from "@/interfaces/IStage";
import { ActionTree } from "vuex";
import MainState from "../utils/MainState";
import { StageActionTypes, StageMutationTypes } from "./enums";
import { IStageState, StageActions } from "./interfaces";

const actions: ActionTree<IStageState, MainState> & StageActions = {
  [StageActionTypes.FETCH_LIST]({ commit }) {
    return new Promise((resolve: Function) => {
      const stages: IStage[] = [
        {id: '1', name: 'My awesome stage', nodes: 12, links: 15}
      ]
      commit(StageMutationTypes.SET_LIST, stages);
    });
  }
}

export default actions;