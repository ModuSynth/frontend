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
  },
  [NodeActionTypes.CREATE]({ commit, rootState }, type) {
    const node: any = {
      x: rootState.stages.dragOrigin.x + 50,
      y: rootState.stages.dragOrigin.y + 50,
      type: type,
      stage_id: rootState.stages.stage.id
    }
    return axios.post('http://localhost:3000/nodes', node).then(({ data }) => {
      commit(NodeMutationTypes.ADD_NODE, {...node, id: data.id});
    });
  }
}

export default actions;