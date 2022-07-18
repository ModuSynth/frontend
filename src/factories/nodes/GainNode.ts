import INode from "@/interfaces/INode";
import IParam from "@/interfaces/IParam";

export default function createGainNode(context: AudioContext, node: INode) {
  const gain: GainNode = context.createGain();
  const gValue: number = Number(node.params.find(p => p.name == 'gain')?.value)
  gain.gain.setValueAtTime(gValue, context.currentTime);
  console.log(gain);
  return gain
}