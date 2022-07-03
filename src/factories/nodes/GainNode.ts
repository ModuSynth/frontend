import INode from "@/interfaces/INode";

export default function createGainNode(context: AudioContext, node: INode) {
  const gain: GainNode = context.createGain();
  gain.gain.setValueAtTime(Number(node.params.gain), context.currentTime);
  return gain
}