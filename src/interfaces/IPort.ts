import ILinkDetails from "./api/ILinkDetails";
import { INodeDetails } from "./api/INodeDetails";

export default interface IPort {
    // the index, starting at 0, of the port in the list.
    index: number;
    // The links connected to this port.
    links?: ILinkDetails[];
}

export function createPorts(node: INodeDetails, count: number): IPort[] {
    return Array.from(Array(count)).map((_value, index): IPort => {
        return { index, links: [] }
    });
}