import axios from "axios";
import { ActionTree } from "vuex";
import MainState from "../utils/MainState";
import { NodeActionTypes, NodeMutationTypes } from "./enums";
import { INodeState, NodeActions } from "./interfaces";
import defaults from '@/utils/defaults'
import { LinkActionTypes } from "../links/enums";
import Node from '@/interfaces/implementations/Node'
import { NodeType } from "@/interfaces/enums/NodeType";
import createNode from "@/factories/NodesFactory";
import INode from "@/interfaces/INode";

const actions: ActionTree<INodeState, MainState> & NodeActions = {
  [NodeActionTypes.FETCH_LIST]({ commit, dispatch }, stageId) {
    return axios.get(`http://localhost:3000/nodes?stage_id=${stageId}`).then(({ data }) => {
      commit(NodeMutationTypes.SET_NODES_LIST, data);
      dispatch(`links/${LinkActionTypes.FETCH_LIST}`, null, {root: true})
    });
  },
  [NodeActionTypes.CREATE]({ commit, rootState }, type) {
    const creation: Node = createNode(rootState.stages.stage, type as NodeType);
    return axios.post('http://localhost:3000/nodes', creation.payload).then(({ data }) => {
      creation.id = data.id;
      commit(NodeMutationTypes.ADD_NODE, creation);
    });
  },
  [NodeActionTypes.SAVE_POSITION]({ state }) {
    if (state.dragged === undefined) return;

    const uri: string = `http://localhost:3000/nodes/${state.dragged.id}`;
    return axios.patch(uri, { x: state.dragged.x, y: state.dragged.y }).then(() => {
      state.dragged = undefined;
    })
  },
  [NodeActionTypes.SAVE_PARAMS](_context, payload) {
    const uri: string = `http://localhost:3000/nodes/${payload.id}`;
    return axios.patch(uri, { params: payload.params })
  },
  [NodeActionTypes.DELETE]({ commit, state }, nodeId) {
    return axios.delete(`http://localhost:3000/nodes/${nodeId}`).then(() => {
       commit(NodeMutationTypes.REMOVE_NODE, nodeId);
    })
  }
}

export default actions;