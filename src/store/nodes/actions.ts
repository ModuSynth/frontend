import axios from "axios";
import { ActionTree } from "vuex";
import MainState from "../utils/MainState";
import { NodeActionTypes, NodeMutationTypes } from "./enums";
import { INodeState, NodeActions } from "./interfaces";
import { LinkActionTypes } from "../links/enums";
import { INode } from "@/interfaces/api/INode";
import { IParam } from "@/interfaces/api/IParam";
import { NodesFactory } from "@/factories/NodesFactory";
import ParamWrapper from "@/interfaces/wrappers/ParamWrapper";
import { ParamPortWrapper } from "@/interfaces/wrappers/PortWrapper";

const actions: ActionTree<INodeState, MainState> & NodeActions = {
  [NodeActionTypes.FETCH_LIST]({ commit, dispatch }, stageId) {
    return axios.get(`http://localhost:3000/nodes?stage_id=${stageId}`)
      .then((response: any) => response.data)
      .then((data: INode[]) => {
        commit(NodeMutationTypes.SET_NODES_LIST, data);
        dispatch(`links/${LinkActionTypes.FETCH_LIST}`, null, {root: true})
      });
  },
  [NodeActionTypes.CREATE]({ commit, rootState }, type) {
    const payload: any = {
      x: 50 - rootState.stages.stage.x,
      y: 50 - rootState.stages.stage.y,
      type: type
    }
    return axios.post('http://localhost:3000/nodes', payload).then(({ data }) => {
      commit(NodeMutationTypes.ADD_NODE, NodesFactory.create(rootState.stages.stage, data));
    });
  },
  [NodeActionTypes.SAVE_POSITION]({ state }) {
    if (state.dragged === undefined) return;

    const uri: string = `http://localhost:3000/nodes/${state.dragged.id}`;
    return axios.patch(uri, { x: state.dragged.x, y: state.dragged.y }).then(() => {
      state.dragged = undefined;
    })
  },
  [NodeActionTypes.SAVE_PARAMS](_context, node) {
    const uri: string = `http://localhost:3000/nodes/${node.id}`;
    const params: IParam[] = node.params.map((p: ParamWrapper): IParam => {
      return {
        name: p.name,
        value: p.value,
        type: p.type,
        inputs: p.inputs.map((port: ParamPortWrapper) => {
          return {id: port.id, index: port.index }
        })
      };
    })
    return axios.patch(uri, { params })
  },
  [NodeActionTypes.DELETE]({ commit }, id) {
    return axios.delete(`http://localhost:3000/nodes/${id}`).then(() => {
      commit(NodeMutationTypes.REMOVE_NODE, id);
    })
  }
}

export default actions;