import { IStageDetails } from "@/interfaces/api/IStage";
import { INodeDetails, IPort } from "@/interfaces/api/INodeDetails";
import NodeWrapper from "@/interfaces/wrappers/NodeWrapper";
import { NodePortWrapper } from "@/interfaces/wrappers/PortWrapper";


export class NodesFactory {
    public static create(stage: IStageDetails, details: INodeDetails): NodeWrapper {
        const wrapper: NodeWrapper = new NodeWrapper(stage, details);
        wrapper.inputs = details.inputs.map((details: IPort) => {
            return new NodePortWrapper(wrapper, details)
        })
        wrapper.outputs = details.outputs.map((details: IPort) => {
            return new NodePortWrapper(wrapper, details)
        })
        return wrapper;
    }
}