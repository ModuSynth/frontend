import { IParam } from "@/interfaces/api/IParam";
import { IPort } from "@/interfaces/api/IPort";
import NodeWrapper from "@/interfaces/wrappers/NodeWrapper";
import ParamWrapper, { ListParameter,NumberParameter } from "@/interfaces/wrappers/ParamWrapper";
import { ParamPortWrapper } from "@/interfaces/wrappers/PortWrapper";

export default class ParamsFactory {
    public static create(node: NodeWrapper, details: IParam): ParamWrapper {
        let param: ParamWrapper;
        if (details.type === 'NumberParameter') {
            param = new NumberParameter(node, details);
            param.inputs = details.inputs.map((port: IPort) => {
                return new ParamPortWrapper(param as NumberParameter, port);
            })
        }
        else {
            param = new ListParameter(node, details);
        }
        return param;
    }
}