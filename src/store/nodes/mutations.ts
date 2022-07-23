import { wrapNode } from "@/factories/NodesFactory";
import ILink from "@/interfaces/ILink";
import INode from "@/interfaces/INode";
import ICoordinates from "@/interfaces/utils/ICoordinates";
import { findIndex, remove } from "lodash";
import { MutationTree } from "vuex";
import { NodeMutationTypes } from "./enums";
import { INodeState, NodeMutations } from "./interfaces";

const mutations: MutationTree<INodeState> & NodeMutations = {
  [NodeMutationTypes.SET_NODES_LIST](state, payload) {
    payload.forEach((node: INode) => {
      state.nodes.push(wrapNode((this.state as any).stages.stage, node));
    });
    state.loaded = true;
  },
  [NodeMutationTypes.START_DRAG](state, {node, $event}) {
    state.dragged = node;
    state.dragOrigin = { x: $event.clientX, y: $event.clientY }
  },
  [NodeMutationTypes.MOVE_DRAG](state, $event) {
    if (state.dragged === undefined) return;

    const delta: ICoordinates = {
      x: $event.clientX - state.dragOrigin.x,
      y: $event.clientY - state.dragOrigin.y
    }
    state.dragged.x += delta.x;
    state.dragged.y += delta.y;
    state.dragOrigin = {
      x: $event.clientX,
      y: $event.clientY
    }
  },
  [NodeMutationTypes.END_DRAG](state) {
    state.dragged = undefined;
    state.dragOrigin = { x: 0, y: 0 };
  },
  [NodeMutationTypes.ADD_NODE](state, node) {
    state.nodes.push(node);
  },
  [NodeMutationTypes.REMOVE_NODE](state, nodeId) {
    remove(state.nodes, {id: nodeId})
  },
}

export default mutations;