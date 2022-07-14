import ILink from "./ILink";
import INode from "./INode";

export default interface IPort {
    // The node this port is declared into.
    node: INode;
    // the index, starting at 0, of the port in the list.
    index: number;
    // The links connected to this port.
    links?: ILink[];
}

export function createPorts(node: INode, count: number): IPort[] {
    return Array.from(Array(count)).map((_value, index) => {
        return { node, index, links: [] }
    });
}