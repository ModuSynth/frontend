import { IPort } from "../api/IPort";
import NodeWrapper from "./NodeWrapper";
import { NumberParameter } from "./ParamWrapper";

export default abstract class PortWrapper implements IPort {

    public readonly id: string

    public constructor(details: IPort) {
        this.id = details.id;
    }

    public abstract connectInput(port: NodePortWrapper): void;
}

export class NodePortWrapper extends PortWrapper {
    public readonly node: NodeWrapper;

    public constructor(node: NodeWrapper, details: IPort) {
        super(details);
        this.node = node;
    }

    public connectInput(port: NodePortWrapper): void {
        port.node.waaNode.connect(this.node.waaNode);
    }
}

export class ParamPortWrapper extends PortWrapper {
    public readonly param: NumberParameter;

    public constructor(param: NumberParameter, details: IPort) {
        super(details);
        this.param = param;
    }

    public connectInput(port: NodePortWrapper): void {
        port.node.waaNode.connect(this.param.waaParam);
    }
}