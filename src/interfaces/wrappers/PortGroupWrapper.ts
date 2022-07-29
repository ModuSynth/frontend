import { IPort } from "../api/IPort";
import NodeWrapper from "./NodeWrapper";
import PortWrapper, { NodePortWrapper } from "./PortWrapper"

export enum PortGroupType {
    INPUT,
    OUTPUT
}

export default class PortGroupWrapper {
    public readonly type: PortGroupType = PortGroupType.INPUT

    public readonly node: NodeWrapper;

    public readonly ports: NodePortWrapper[] = []

    public constructor(node: NodeWrapper, ports: IPort[]) {
        this.node = node;
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
}