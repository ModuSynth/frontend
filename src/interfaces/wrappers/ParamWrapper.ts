import { IParam, IPort } from "../api/INodeDetails";

export default class ParamWrapper implements IParam {
    name: string;
    value: any;
    inputs: IPort[];

    public constructor(details: IParam) {
        this.name = details.name;
        this.value = details.value;
        this.inputs = []
    }
}