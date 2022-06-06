import INode from "@/interfaces/INode";
import { NodeMutationTypes } from "./enums";

export interface INodeState {
  nodes: INode[]
}

export type NodeMutations<S = INodeState> = {
  [NodeMutationTypes.SET_NODES_LIST](state: INodeState, payload: INode[]): void;
}