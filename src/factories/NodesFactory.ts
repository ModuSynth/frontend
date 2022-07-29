import { IStageDetails } from "@/interfaces/api/IStage";
import { INode } from "@/interfaces/api/INode";
import NodeWrapper from "@/interfaces/wrappers/NodeWrapper";


export class NodesFactory {
    public static create(stage: IStageDetails, details: INode): NodeWrapper {
        return new NodeWrapper(stage, details);
    }
}