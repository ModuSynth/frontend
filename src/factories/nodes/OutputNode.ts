import INode from "@/interfaces/INode";

export default function createOutputNode(context: AudioContext, node: INode): AudioDestinationNode {
  return context.destination;
}