import axios from "axios";
import { ActionTree } from "vuex";
import MainState from "../utils/MainState";
import { NodeActionTypes, NodeMutationTypes } from "./enums";
import { INodeState, NodeActions } from "./interfaces";

const actions: ActionTree<INodeState, MainState> & NodeActions = {
  [NodeActionTypes.FETCH_LIST]({ commit }, stageId) {
    return axios.get(`http://localhost:3000/nodes?stage_id=${stageId}`).then(({ data }) => {
      commit(NodeMutationTypes.SET_NODES_LIST, data);
    });
  }
}

export default actions;