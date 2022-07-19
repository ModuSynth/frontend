import { NodeType } from "@/interfaces/enums/NodeType";
import { IStageDetails } from "@/interfaces/IStage";
import Node from '@/interfaces/implementations/Node'
import factories from "./nodes";
import { AUDIO_CONTEXT } from "@/utils/constants";
import INode from "@/interfaces/INode";
import { tools, IParamDefault } from '@/config/tools'
import IParam from "@/interfaces/IParam";
import { cloneDeep } from "lodash";
import { createPorts } from "./PortsFactory";

/**
 * Creates the Web Audio API node corresponding to this node using the dedicated factory.
 * @param node 
 * @returns 
 */
 function createWaaNode(node: Node): AudioNode {
    return factories[node.type](AUDIO_CONTEXT, (node as unknown as INode))
}

function initParams(node: Node): IParam[] {
    return tools[node.type].params.map((p: IParamDefault) => {
        return { name: p.name, value: p.value, dy: 0 };
    });
}

function createEmptyWrapper(stage: IStageDetails, type: NodeType): Node {
    const creation: Node = new Node(stage, type as NodeType);
    creation.params = initParams(creation);
    creation.dimensions = tools[type].dimensions
    return creation
}

function initPorts(node: Node) {
    node.inputs = createPorts(node, node.waaNode.numberOfInputs);
    node.outputs = createPorts(node, node.waaNode.numberOfOutputs);
}

export default function createNode(stage: IStageDetails, type: NodeType): Node {
    const creation: Node = createEmptyWrapper(stage, type);
    creation.position = { x: 50 - stage.x, y: 50 - stage.y}
    creation.waaNode = createWaaNode(creation);
    initPorts(creation);
    return creation;
}

export function wrapNode(stage: IStageDetails, node: INode): Node {
    const creation: Node = createEmptyWrapper(stage, node.type);
    creation.params = node.params
    creation.id = node.id
    creation.position = { x: node.x, y: node.y }
    creation.waaNode = createWaaNode(creation);
    initPorts(creation);
    return creation;
}