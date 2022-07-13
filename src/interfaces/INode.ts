import { NodeType } from "./enums/NodeType";
import IParam from "./IParam";
import IPort from "./IPort";

export default interface INode {
  x: number;
  y: number;
  id: string;
  type: NodeType;
  width: number;
  height: number;
  // The Web Audio Api (WAA) node linked to this node wrapper
  waaNode: AudioNode;
  params: IParam[];
  inputs: IPort[];
  outputs: IPort[];
}