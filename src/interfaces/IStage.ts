import INode from "./INode";

/**
 * A stage
 */
export default interface IStage {
  id: string;
  name: string;
  links: number;
  nodes: number;
}

export interface IStageDetails {
  id: string;
  name: string;
  x: number;
  y: number;
  nodes: INode[];
}