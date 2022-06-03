import IStage, { IStageDetails } from "@/interfaces/IStage";
import { MutationTree } from "vuex";
import { StageMutationTypes } from "./enums";
import { IStageState, StageMutations } from "./interfaces";

const mutations : MutationTree<IStageState> & StageMutations = {
  [StageMutationTypes.SET_LIST](state, payload: IStage[]) {
    state.list = payload;
  },
  [StageMutationTypes.SET_DETAILS](state, payload: IStageDetails) {
    state.stage = payload;
  }
}

export default mutations;