import Port from "@/interfaces/implementations/Port"
import INode from "@/interfaces/INode";
import Node from '@/interfaces/implementations/Node'

export function createPorts(node: Node, numberOfPorts: number): Port[] {
    return Array.from(Array(numberOfPorts)).map((_val: any, index: number) => {
        return new Port(node as unknown as INode, index);
    })
}