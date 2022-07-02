import { NodeType } from "@/interfaces/enums/NodeType";
import INode from "@/interfaces/INode";
import ICoordinates from "@/interfaces/utils/ICoordinates";
import { MutationTree } from "vuex";
import MainState from "../utils/MainState";
import { NodeMutationTypes } from "./enums";
import { INodeState, NodeMutations } from "./interfaces";

function addNode(state: INodeState, globalState: MainState, node: INode) {
  if (node.type == NodeType.OUTPUT) {
    node.waaNode = (globalState as any).stages.context.destination;
  }
  else {
    node.waaNode = eval(`new ${node.type}(globalState.stages.context)`);
    if (node.type == NodeType.OSCILLATOR) {
      (node.waaNode as OscillatorNode).start()
    }
  }
  state.nodes.push({...node, width: 0, height: 0});
}

const mutations: MutationTree<INodeState> & NodeMutations = {
  [NodeMutationTypes.SET_NODES_LIST](state, payload) {
    payload.forEach((node: INode) => addNode(state, this.state, node));
    state.loaded = true;
    console.log(state.nodes)
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
    addNode(state, this.state, node);
  },
  [NodeMutationTypes.REMOVE_NODE](state, nodeId) {
    const index: number = state.nodes.findIndex((node: INode) => {
      return node.id === nodeId;
    });
    state.nodes.splice(index, 1);
  },
}

export default mutations;