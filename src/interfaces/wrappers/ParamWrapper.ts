import { AUDIO_CONTEXT } from "@/utils/constants";
import { IParam } from "../api/IParam";
import { IPort } from "../api/IPort";
import NodeWrapper from "./NodeWrapper";
import { ParamPortWrapper } from "./PortWrapper";

export default abstract class ParamWrapper implements IParam {
    name: string;
    _value: any;
    inputs: ParamPortWrapper[];
    node: NodeWrapper;
    type: string;

    public constructor(node: NodeWrapper, details: IParam) {
        this.name = details.name;
        this._value = details.value;
        this.inputs = []
        this.node = node;
        this.type = details.type;
    }

    public abstract get value(): any;

    public abstract set value(val: any);
}

export class NumberParameter extends ParamWrapper {

    public constructor(node: NodeWrapper, details: IParam) {
        super(node, details);
        this._value = details.value;
    }

    public get waaParam(): AudioParam {
        return this.node.waaNode[this.name as keyof AudioNode] as unknown as AudioParam;
    }

    public get value(): any {
        return this._value
    }

    public set value(val: any) {
        this._value = val;
        this.waaParam.setValueAtTime(val, AUDIO_CONTEXT.currentTime);
    }
}

export class ListParameter extends ParamWrapper {
    public constructor(node: NodeWrapper, details: IParam) {
        super(node, details);
    }

    public get value(): any {
        return this._value
    }

    public set value(val: any) {
        this._value = val;
    }
}