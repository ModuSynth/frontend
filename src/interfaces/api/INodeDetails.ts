export interface IParam {
    name: string;
    value: any;
    inputs: IPort[]
}

export interface IPort {
    id: string
}

export interface INodeDetails {
    id: string;
    type: string;
    params: IParam[]
    inputs: IPort[],
    outputs: IPort[]
}