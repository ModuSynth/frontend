import { IPort } from "./IPort";


export interface IParam {
    name: string;
    value: any;
    inputs: IPort[];
    type: string;
}
