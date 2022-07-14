import IPort from "./IPort";

export default interface ILink {
  id: string;
  from: IPort;
  to: IPort;
}

export interface IParamLink {
  id: string;
  from: IPort;
  to: IPort;
  paramName: string;
}

export interface IApiLink {
  id: string;
  from: IApiEnd;
  to: IApiEnd;
  through?: IApiEnd;
}

export interface IApiEnd {
  index: number;
  id: string;
}