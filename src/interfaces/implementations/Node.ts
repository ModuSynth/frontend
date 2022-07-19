import { NodeType } from "../enums/NodeType";
import INode from "../INode";
import IParam from "../IParam";
import IPort from "../IPort";
import IStage, { IStageDetails } from "../IStage";

export default class Node implements INode {

    // The audio node from the Web Aduio API linked to this node.
    private _waaNode!: AudioNode;
    // The ports you can bring sound content to the node from.
    private _inputs: IPort[];
    // The ports outputing the sound content of the node.
    private _outputs: IPort[];
    // The type of the node, representing the class it's wrapping in the Web Audio API.
    private _type: NodeType;

    private _stage: IStageDetails;
    
    // The list of parameters embedded in this node.
    public params: IParam[] = [];
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

    public constructor(stage: IStageDetails, type: NodeType) {
        this._type = type;
        this._inputs = [];
        this._outputs = [];
        this._stage = stage;
        this.position = {x: 50, y: 50}
    }

    public get type(): NodeType {
        return this._type;
    }

    public get waaNode(): AudioNode {
        return this._waaNode;
    }

    public get inputs(): IPort[] {
        return this._inputs;
    }

    public get outputs(): IPort[] {
        return this._outputs;
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
}