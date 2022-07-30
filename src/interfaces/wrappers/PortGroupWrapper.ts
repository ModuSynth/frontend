import { FULL_PORT_DIAMETER, PORT_RADIUS, PORT_TOP_MARGIN } from "@/utils/constants";
import { IPort } from "../api/IPort";
import NodeWrapper from "./NodeWrapper";
import PortWrapper, { NodePortWrapper } from "./PortWrapper"

export enum PortGroupType {
    INPUT,
    OUTPUT
}

export default class PortGroupWrapper {
    public readonly type: PortGroupType;

    public readonly node: NodeWrapper;

    public readonly ports: NodePortWrapper[] = []

    public constructor(node: NodeWrapper, ports: IPort[], type: PortGroupType = PortGroupType.INPUT) {
        this.node = node;
        this.type = type;
        ports.forEach((port: IPort) => {
            this.ports.push(new NodePortWrapper(this, port));
        })
    }

    public get length(): number {
        return this.ports.length;
    }

    public get isInputs(): boolean {
        return this.type === PortGroupType.INPUT
    }

    public get isOutputs(): boolean {
        return !this.isInputs;
    }

    public get x(): number {
        return this.node.x + (this.isOutputs ? this.node.width : 0);
    }

    /**
     * In this method, we add a PORT_RADIUS at the end because the "this.dy" part
     * goes from the top of the node to the top of the ports group, and not to the
     * center of the first port in the group.
     */
    public get y(): number {
        return this.node.y + this.dy + PORT_RADIUS;
    }

    public get dy(): number {
        return (this.node.height - this.height) / 2
    }

    public get height(): number {
        return  FULL_PORT_DIAMETER * this.ports.length - PORT_TOP_MARGIN
    }
}