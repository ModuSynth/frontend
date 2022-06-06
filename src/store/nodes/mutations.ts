import { MutationTree } from "vuex";
import MainState from "../utils/MainState";
import { NodeMutationTypes } from "./enums";
import { INodeState, NodeMutations } from "./interfaces";

const mutations: MutationTree<INodeState> & NodeMutations = {
  [NodeMutationTypes.SET_NODES_LIST](state, payload) {
    state.nodes = payload;
  }
}

export default mutations;