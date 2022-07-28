import ILink from "../ILink";
import NodeWrapper from "../wrappers/NodeWrapper";

export interface IParam {
    name: string;
    value: any;
    inputs: IPort[]
    node: NodeWrapper;
    type: string;
}

export interface IPort {
    id: string
    links: ILink[];
}

export interface INodeDetails {
    id: string;
    type: string;
    params: IParam[]
    inputs: IPort[],
    outputs: IPort[],
    x: number,
    y: number,
}