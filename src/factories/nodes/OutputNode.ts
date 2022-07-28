import NodeWrapper from "@/interfaces/wrappers/NodeWrapper";

export default function createOutputNode(context: AudioContext, node: NodeWrapper) {
  node.waaNode = context.destination;
}