import INode from "@/interfaces/INode";
import ICoordinates from "@/interfaces/utils/ICoordinates";
import { NodeMutationTypes, NodeActionTypes } from "./enums";

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
  [NodeMutationTypes.START_DRAG](state: INodeState, payload: any): void;
  [NodeMutationTypes.MOVE_DRAG](state: INodeState, payload: MouseEvent): void;
  [NodeMutationTypes.END_DRAG](state: INodeState): void;
  [NodeMutationTypes.ADD_NODE](state: INodeState, payload: any): void;
}

export type NodeActions = {
  [NodeActionTypes.FETCH_LIST](context: any, payload: number): Promise<any>;
  [NodeActionTypes.CREATE](context: any, type: string): Promise<any>;
  [NodeActionTypes.SAVE_POSITION](context: any, payload: MouseEvent): any
}