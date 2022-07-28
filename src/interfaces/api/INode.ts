import { IParam } from "./IParam";
import { IPort } from "./IPort";

export interface INode {
    id: string;
    type: string;
    params: IParam[]
    inputs: IPort[],
    outputs: IPort[],
    x: number,
    y: number,
}