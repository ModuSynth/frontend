import { FULL_PORT_DIAMETER } from "@/utils/constants";
import { IPort } from "../api/IPort";
import LinkWrapper from "./LinkWrapper";
import NodeWrapper from "./NodeWrapper";
import { NumberParameter } from "./ParamWrapper";
import PortGroupWrapper from "./PortGroupWrapper";

export default abstract class PortWrapper implements IPort {

    public readonly id: string

    public readonly index: number;

    public readonly links: LinkWrapper[] = []

    public constructor(details: IPort) {
        this.id = details.id;
        this.index = details.index;
    }

    public abstract connectInput(port: NodePortWrapper): void;

    public abstract get x(): number;

    public abstract get y(): number;
}

export class NodePortWrapper extends PortWrapper {
    public readonly group: PortGroupWrapper;

    public constructor(group: PortGroupWrapper, details: IPort) {
        super(details);
        this.group = group;
    }

    public get node(): NodeWrapper {
        return this.group.node;
    }

    public connectInput(port: NodePortWrapper): void {
        port.node.waaNode.connect(this.node.waaNode, port.index, this.index);
    }

    public get x(): number {
        return this.group.x;
    }

    public get y(): number {
        return this.group.y + this.index * FULL_PORT_DIAMETER;
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
        return this.param.node.x + 22;
    }

    public get y(): number {
        return this.param.node.y + this.param.dy;
    }
}