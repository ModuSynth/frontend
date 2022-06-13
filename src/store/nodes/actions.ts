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
      x: 50 - rootState.stages.stage.x,
      y: 50 - rootState.stages.stage.y,
      type: type,
      stage_id: rootState.stages.stage.id
    }
    return axios.post('http://localhost:3000/nodes', node).then(({ data }) => {
      commit(NodeMutationTypes.ADD_NODE, {...node, id: data.id});
    });
  },
  [NodeActionTypes.SAVE_POSITION]({ commit, state }, event) {
    if (state.dragged === undefined) return;

    const uri: string = `http://localhost:3000/nodes/${state.dragged.id}`;
    return axios.patch(uri, { x: state.dragged.x, y: state.dragged.y }).then(() => {
      state.dragged = undefined;
    })
  }
}

export default actions;