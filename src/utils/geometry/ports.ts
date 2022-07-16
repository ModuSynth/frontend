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
    return yPort(port, port.node.waaNode.numberOfInputs);
}

export function yOutput(port: IPort) {
    return yPort(port, port.node.waaNode.numberOfOutputs);
}

export function yPort(port: IPort, numberOfPort: number) {
    return port.node.y + portsY(port.node, numberOfPort) + portY(port)
}