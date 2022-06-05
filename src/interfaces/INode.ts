import { NodeType } from "./enums/NodeType";
import IParameter from "./IParameter";

export default interface INode {
  x: number;
  y: number;
  name: string;
  id: string;
  type: NodeType;
  parameters: IParameter[]
}