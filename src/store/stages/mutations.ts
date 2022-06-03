import { MutationTree } from "vuex";
import { StageMutationTypes } from "./enums";
import { IStageState, StageMutations } from "./interfaces";

const mutations : MutationTree<IStageState> & StageMutations = {
  [StageMutationTypes.SET_LIST](state, payload) {
    state.list = payload;
  }
}

export default mutations;