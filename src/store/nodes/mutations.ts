import ICoordinates from "@/interfaces/utils/ICoordinates";
import { MutationTree } from "vuex";
import { NodeMutationTypes } from "./enums";
import { INodeState, NodeMutations } from "./interfaces";

const mutations: MutationTree<INodeState> & NodeMutations = {
  [NodeMutationTypes.SET_NODES_LIST](state, payload) {
    state.nodes = payload;
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
  }
}

export default mutations;