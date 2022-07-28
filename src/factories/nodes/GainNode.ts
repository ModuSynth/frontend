import NodeWrapper from "@/interfaces/wrappers/NodeWrapper";

export default function createGainNode(context: AudioContext, node: NodeWrapper) {
  node.waaNode = context.createGain();
  node.initParams("gain");
}