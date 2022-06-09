import INode from "@/interfaces/INode";
import ICoordinates from "@/interfaces/utils/ICoordinates";
import { NodeMutationTypes } from "./enums";

export interface INodeState {
  // The array of the nodes in the currently displayed stage.
  nodes: INode[];
  // The node currently being dragged on the stage.
  dragged?: INode;
  // The coordinates from the last drag event on the dragged node.
  dragOrigin: ICoordinates;
}

export type NodeMutations<S = INodeState> = {
  [NodeMutationTypes.SET_NODES_LIST](state: INodeState, payload: INode[]): void;
}