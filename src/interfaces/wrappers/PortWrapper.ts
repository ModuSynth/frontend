import ILinkDetails from "../api/ILinkDetails";
import { IPort } from "../api/INodeDetails";
import NodeWrapper from "./NodeWrapper";
import ParamWrapper from "./ParamWrapper";

export default class PortWrapper implements IPort {

    public readonly id: string

    public constructor(details: IPort) {
        this.id = details.id;
    }
}

export class NodePortWrapper extends PortWrapper {
    public readonly node: NodeWrapper;

    public constructor(node: NodeWrapper, details: IPort) {
        super(details);
        this.node = node;
    }
}

export class ParamPortWrapper extends PortWrapper {
    public readonly param: ParamWrapper;

    public constructor(param: ParamWrapper, details: IPort) {
        super(details);
        this.param = param;
    }
}