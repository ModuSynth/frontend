interface IParam {
    name: string;
    value: any;
    inputs: IPort[]
}

interface IPort {
    id: string
}

export default interface INodeDetails {
    id: string;
    type: string;
    params: IParam[]
    inputs: IPort[],
    outputs: IPort[]
}