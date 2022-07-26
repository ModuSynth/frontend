import INode from "@/interfaces/INode";
import ICoordinates from "@/interfaces/utils/ICoordinates";
import { NodeMutationTypes, NodeActionTypes } from "./enums";
import Node from '@/interfaces/implementations/Node'
import { INodeDetails } from "@/interfaces/api/INodeDetails";
import NodeWrapper from "@/interfaces/wrappers/NodeWrapper";

export interface INodeState {
  // The array of the nodes in the currently displayed stage.
  nodes: NodeWrapper[];
  // The node currently being dragged on the stage.
  dragged?: Node;
  // The coordinates from the last drag event on the dragged node.
  dragOrigin: ICoordinates;
  // Indicates whether the nodes have been loaded (TRUE) or not (FALSE);
  loaded: boolean;
}

export type NodeMutations<S = INodeState> = {
  [NodeMutationTypes.SET_NODES_LIST](state: S, payload: INodeDetails[]): void;
  [NodeMutationTypes.START_DRAG](state: S, payload: {node: Node, $event: MouseEvent}): void;
  [NodeMutationTypes.MOVE_DRAG](state: S, payload: MouseEvent): void;
  [NodeMutationTypes.END_DRAG](state: S): void;
  [NodeMutationTypes.ADD_NODE](state: S, payload: INodeDetails): void;
  [NodeMutationTypes.REMOVE_NODE](state: S, payload: string): void;
}

export type NodeActions = {
  [NodeActionTypes.FETCH_LIST](context: any, payload: string): Promise<any>;
  [NodeActionTypes.CREATE](context: any, type: string): Promise<any>;
  [NodeActionTypes.SAVE_POSITION](context: any, payload: MouseEvent): any;
  [NodeActionTypes.SAVE_PARAMS](context: any, payload: INode): any;
  [NodeActionTypes.DELETE](context: any, payload: string): Promise<any>;
}