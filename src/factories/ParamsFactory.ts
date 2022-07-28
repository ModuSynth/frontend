import { IParam } from "@/interfaces/api/INodeDetails";
import NodeWrapper from "@/interfaces/wrappers/NodeWrapper";
import ParamWrapper, { ListParameter,NumberParameter } from "@/interfaces/wrappers/ParamWrapper";

export default class ParamsFactory {
    public static create(node: NodeWrapper, details: IParam): ParamWrapper {
        if (details.type === 'NumberParameter') {
            return new NumberParameter(node, details);
        }
        else {
            return new ListParameter(node, details);
        }
    }
}