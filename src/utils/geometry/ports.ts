import INode from "@/interfaces/INode";
import IPort from "@/interfaces/IPort";
import { PORT_RADIUS, PORT_TOP_MARGIN } from "../constants";

/**
 * Getter for the Y coordinates of the port group on this node. The height of the
 * ports group, hence its Y origin, depends on the number of ports it contains.
 * @param node the node you're computing this coordinate on.
 * @param numberOfPorts the number of ports in this ports group.
 * @returns the Y coordinates for the ports group.
 */
export function portsY(node: INode, numberOfPorts: number): number {
    return (node.height - portsHeight(numberOfPorts)) / 2 + PORT_RADIUS
}

export function portsHeight(numberOfPorts: number): number {
    return (PORT_RADIUS * 2 * numberOfPorts) + (PORT_TOP_MARGIN * (numberOfPorts - 1));
}

export function portY(port: IPort): number {
    return port.index * ((2 * PORT_RADIUS) + PORT_TOP_MARGIN)
}

export function yInput(port: IPort) {
    return yLinkPort(port, port.node.waaNode.numberOfInputs);
}

export function yOutput(port: IPort) {
    return yLinkPort(port, port.node.waaNode.numberOfOutputs);
}

/**
 * This function computes the absolute Y coordinate for one end of a link between two nodes.
 * This Y coordinates depends on :
 * - the coordinates of the node itself.
 * - the number of ports in the corresponding ports group (to get the Y coordinate of it).
 * - the position of the port in the port group.
 * @param port the port to determine the Y coordinates from.
 * @param numberOfPort the total number of ports in the corresponding port group.
 * @returns the number of pixels for the Y coordinate of the corresponding link's end.
 */
export function yLinkPort(port: IPort, numberOfPort: number) {
    return port.node.y + portsY(port.node, numberOfPort) + portY(port)
}