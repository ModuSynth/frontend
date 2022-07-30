import NodeWrapper from "@/interfaces/wrappers/NodeWrapper";

export default function createDelayNode(context: AudioContext, node: NodeWrapper) {
  node.waaNode = context.createDelay();
  node.initParams("delayTime");
}