import NodeWrapper from "@/interfaces/wrappers/NodeWrapper";
import { cloneDeep } from "lodash";

export default function createOscillatorNode(context: AudioContext, node: NodeWrapper) {
  node.waaNode = context.createOscillator();
  (node.waaNode as OscillatorNode).start();
  node.initParams("frequency", "detune", "type");
}