import { INodeDetails } from "./api/INodeDetails";
import ILink from "./ILink";

export default interface IPort {
    // The node this port is declared into.
    node: INodeDetails;
    // the index, starting at 0, of the port in the list.
    index: number;
    // The links connected to this port.
    links?: ILink[];
}

export function createPorts(node: INodeDetails, count: number): IPort[] {
    return Array.from(Array(count)).map((_value, index) => {
        return { node, index, links: [] }
    });
}