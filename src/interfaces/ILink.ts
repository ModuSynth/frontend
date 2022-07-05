import INode from "./INode";

export default interface ILink {
  id: string;
  from: IEnd;
  to: IEnd;
}

export interface IParamLink {
  id: string;
  from: IEnd;
  to: IEnd;
  paramName: string;
}


export interface IEnd {
  node: INode;
  index: number;
}

export interface IApiLink {
  id: string;
  from: IApiEnd;
  to: IApiEnd;
  through?: IApiEnd;
}

/**
 * The ends of a link as returned by the API before being parsed.
 */
export interface IApiEnd {
  index: number;
  id: string;
}