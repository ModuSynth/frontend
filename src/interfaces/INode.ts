import { NodeType } from "./enums/NodeType";

export default interface INode {
  x: number;
  y: number;
  id: string;
  type: NodeType;
  // The Web Audio Api (WAA) node linked to this node wrapper
  waaNode: AudioNode;
}