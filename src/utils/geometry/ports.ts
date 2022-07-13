import INode from "@/interfaces/INode";
import { PORT_RADIUS, PORT_TOP_MARGIN } from "../constants";

/**
 * Getter for the Y coordinates of the port group on this node. The height of the
 * ports group, hence its Y origin, depends on the number of ports it contains.
 * @param node the node you're computing this coordinate on.
 * @param numberOfPorts the number of ports in this ports group.
 * @returns the Y coordinates for the ports group.
 */
export function portsY(node: INode, numberOfPorts: number): number {
    return (node.height - portsHeight(numberOfPorts)) / 2
}

export function portsHeight(numberOfPorts: number): number {
    return (PORT_RADIUS * 2 * numberOfPorts) + (PORT_TOP_MARGIN * (numberOfPorts - 1));
}

export function portY(index: number): number {
    return (((index * 2) + 1) * PORT_RADIUS) + (index * PORT_TOP_MARGIN)
}