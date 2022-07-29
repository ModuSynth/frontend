import { FULL_PORT_DIAMETER } from "@/utils/constants";
import { portsY } from "@/utils/geometry/ports";
import { IPort } from "../api/IPort";
import NodeWrapper from "./NodeWrapper";
import { NumberParameter } from "./ParamWrapper";

export default abstract class PortWrapper implements IPort {

    public readonly id: string

    public readonly index: number;

    public constructor(details: IPort) {
        this.id = details.id;
        this.index = details.index;
    }

    public abstract connectInput(port: NodePortWrapper): void;

    public abstract get x(): number;

    public abstract y(numberOfPorts: number): number;
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

    public get x(): number {
        return this.node.x;
    }

    public y(numberOfPorts: number): number {
        const baseY = this.node.y + portsY(this.node, numberOfPorts);
        const dy = this.index * FULL_PORT_DIAMETER
        return baseY + dy;
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

    public get x(): number {
        return this.param.node.x + 20;
    }

    public y(numberOfPorts: number = 0): number {
        return this.param.node.y;
    }
}