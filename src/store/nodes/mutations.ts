import { NodesFactory } from "@/factories/NodesFactory";
import { INodeDetails } from "@/interfaces/api/INodeDetails";
import ICoordinates from "@/interfaces/utils/ICoordinates";
import { reject } from "lodash";
import { MutationTree } from "vuex";
import { NodeMutationTypes } from "./enums";
import { INodeState, NodeMutations } from "./interfaces";
import { IStageDetails } from "@/interfaces/IStage";

const mutations: MutationTree<INodeState> & NodeMutations = {
  [NodeMutationTypes.SET_NODES_LIST](state, payload) {
    payload.forEach((node: INodeDetails) => {
      const stage: IStageDetails = (this.state as any).stages.stage
      state.nodes.push(NodesFactory.create(stage, node));
    });
    console.log(`Nodes list have been loaded, ${state.nodes.length} elements now in list`)
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
  [NodeMutationTypes.REMOVE_NODE](state, id) {
    state.nodes = reject(state.nodes, { id })
  },
}

export default mutations;