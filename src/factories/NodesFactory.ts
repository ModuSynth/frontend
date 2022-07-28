import { IStageDetails } from "@/interfaces/IStage";
import { INodeDetails } from "@/interfaces/api/INodeDetails";
import NodeWrapper from "@/interfaces/wrappers/NodeWrapper";


export class NodesFactory {
    public static create(stage: IStageDetails, details: INodeDetails): NodeWrapper {
        return new NodeWrapper(stage, details);
    }
}