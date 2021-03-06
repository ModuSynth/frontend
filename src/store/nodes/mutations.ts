import { NodesFactory } from "@/factories/NodesFactory";
import { INode } from "@/interfaces/api/INode";
import { reject } from "lodash";
import { MutationTree } from "vuex";
import { NodeMutationTypes } from "./enums";
import { INodeState, NodeMutations } from "./interfaces";
import { IStageDetails } from "@/interfaces/api/IStage";
import ICoordinates from "@/interfaces/utils/ICoordinates";

const mutations: MutationTree<INodeState> & NodeMutations = {
  [NodeMutationTypes.SET_NODES_LIST](state, payload) {
    payload.forEach((node: INode) => {
      const stage: IStageDetails = (this.state as any).stages.stage
      state.nodes.push(NodesFactory.create(stage, node));
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
  [NodeMutationTypes.ADD_NODE](state, details) {
    const stage: IStageDetails = (this.state as any).stages.stage
    state.nodes.push(NodesFactory.create(stage, details));
  },
  [NodeMutationTypes.REMOVE_NODE](state, node) {
    state.nodes = reject(state.nodes, { id: node.id })
  },
}

export default mutations;