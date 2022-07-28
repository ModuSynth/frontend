import { INodeDetails } from "./INodeDetails";

/**
 * A stage
 */
export default interface IStage {
  id: string;
  name: string;
  links_count: number;
  nodes_count: number;
}

export interface IStageDetails {
  id: string;
  name: string;
  x: number;
  y: number;
  nodes: INodeDetails[];
}