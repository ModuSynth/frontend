import { NodeType } from "./enums/NodeType";

export default interface INode {
  x: number;
  y: number;
  id: string;
  type: NodeType;
}