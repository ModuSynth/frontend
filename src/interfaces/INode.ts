import { NodeType } from "./enums/NodeType";

export default interface INode {
  x: number;
  y: number;
  name: string;
  id: string;
  type: NodeType
}