import { FULL_PORT_DIAMETER } from "@/utils/constants";
import { portsY } from "@/utils/geometry/ports";
import { IPort } from "../api/IPort";
import NodeWrapper from "./NodeWrapper";
import { NumberParameter } from "./ParamWrapper";
import PortGroupWrapper from "./PortGroupWrapper";

export default abstract class PortWrapper implements IPort {

    public readonly id: string

    public readonly index: number;

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
        port.node.waaNode.connect(this.node.waaNode);
    }

    public get x(): number {
        return this.node.x;
    }

    public get y(): number {
        const nbPorts: number = (this.group.isInputs ? this.node.inputs : this.node.outputs).length
        const baseY = this.node.y + portsY(this.node, nbPorts);
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
        return this.param.node.x + 22;
    }

    public get y(): number {
        return this.param.node.y + this.param.dy;
    }
}