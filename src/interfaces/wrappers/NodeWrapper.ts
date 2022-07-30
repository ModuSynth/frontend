import { IStageDetails } from "../api/IStage";
import { INode } from "../api/INode";
import { IParam } from "../api/IParam";
import { IPort } from "../api/IPort";
import ParamWrapper from "./ParamWrapper";
import ParamsFactory from "@/factories/ParamsFactory";
import factories from "@/factories/nodes";
import { NodeType } from "../enums/NodeType";
import { AUDIO_CONTEXT } from "@/utils/constants";
import { NodePortWrapper } from "./PortWrapper";
import PortGroupWrapper, { PortGroupType } from "./PortGroupWrapper";

export default class NodeWrapper implements INode {

    // The audio node from the Web Aduio API linked to this node.
    private _waaNode!: AudioNode;
    // The ports you can bring sound content to the node from.
    private _inputs: PortGroupWrapper;
    // The ports outputing the sound content of the node.
    private _outputs: PortGroupWrapper;
    // The type of the node, representing the class it's wrapping in the Web Audio API.
    private _type: string;

    private _stage: IStageDetails;
    
    // The list of parameters embedded in this node.
    public params: ParamWrapper[] = [];
    // The X coordinate of the node in the whole stage.
    public x: number = 0;
    // The Y coordinate of the node in the whole stage.
    public y: number = 0;
    // The unique identifier of this node.
    public id: string = "";
    // The number of pixels from the left side to the right side of the node.
    public width: number = 0;
    // THe number of pixels from the top side to the bottom side of the node.
    public height: number = 0;

    public constructor(stage: IStageDetails, details: INode) {
        this._type = details.type;
        this._stage = stage;
        this.id = details.id;
        this.position = {
            x: details.x,
            y: details.y
        }
        this.params = details.params.map((p: IParam) => {
            return ParamsFactory.create(this, p)
        });
        this._inputs = new PortGroupWrapper(this, details.inputs);
        this._outputs = new PortGroupWrapper(this, details.outputs, PortGroupType.OUTPUT);
        factories[this.type as NodeType](AUDIO_CONTEXT, this);
    }

    public get type(): string {
        return this._type;
    }

    public get waaNode(): AudioNode {
        return this._waaNode;
    }

    public get inputs(): IPort[] {
        return this._inputs.ports;
    }

    public get outputs(): IPort[] {
        return this._outputs.ports;
    }

    public set waaNode(value: AudioNode) {
        this._waaNode = value;
    }

    public set dimensions(dimensions: {width: number, height: number}) {
        this.width = dimensions.width;
        this.height = dimensions.height;
    }

    public set position(position: {x: number, y: number}) {
        this.x = position.x
        this.y = position.y
    }

    // Returns the creation payload corresponding to the node.
    public get payload() {
        return { x: this.x, y: this.y, params: this.params, type: this.type, stage_id: this._stage.id}
    }

    public set inputs(ports: IPort[]) {
        ports.forEach((input: IPort) => this.inputs.push(input));
    }

    public set outputs(ports: IPort[]) {
        ports.forEach((output: IPort) => this.outputs.push(output));
    }

    public get ports(): IPort[] {
        let nodePorts: IPort[] = [ ...this.inputs, ...this.outputs ];
        this.params.forEach((p: ParamWrapper) => {
            p.inputs.forEach((port: IPort) => {
                nodePorts.push(port)
            });
        });
        return nodePorts;
    }

    public setParam(name: string, value: any) {
        this.params.forEach((p: IParam) => {
            if (p.name === name) p.value = value;
        })
    }

    public getParam(name: string): any {
        const p: IParam | undefined = this.params.find((p: IParam) => p.name === name);
        return p === undefined ? undefined : p.value
    }

    public initParams(...params: string[]) {
        params.forEach((name: string) => {
            this.setParam(name, this.getParam(name));
        })
    }

    public get inputsGroup(): PortGroupWrapper {
        return this._inputs;
    }

    public get outputsGroup(): PortGroupWrapper {
        return this._outputs;
    }
}