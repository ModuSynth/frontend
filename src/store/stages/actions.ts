import IStage, { IStageDetails } from "@/interfaces/IStage";
import { ActionTree } from "vuex";
import MainState from "../utils/MainState";
import { StageActionTypes, StageMutationTypes } from "./enums";
import { IStageState, StageActions } from "./interfaces";

const actions: ActionTree<IStageState, MainState> & StageActions = {
  [StageActionTypes.FETCH_LIST]({ commit }) {
    return new Promise<IStage[]>((resolve: Function) => {
      const stages: IStage[] = [
        {id: '1', name: 'My awesome stage', nodes: 12, links: 15}
      ]
      commit(StageMutationTypes.SET_LIST, stages);
      resolve(stages);
    });
  },
  [StageActionTypes.FETCH_ONE]({ commit }, stageId) {
    return new Promise<IStageDetails>((resolve: Function) => {
      const details: IStageDetails = {
        id: stageId.toString(),
        name: 'My awesome stage',
        x: 0,
        y: 0,
        nodes: []
      };
      for (let i = 0; i < 1000; i++) {
        details.nodes.push({x: Math.random() * 3000, y: Math.random() * 2000})
      }
      commit(StageMutationTypes.SET_DETAILS, details);
      resolve(details);
    });
  }
}

export default actions;