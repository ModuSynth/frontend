import INode from "@/interfaces/INode";

export default function createOscillatorNode(context: AudioContext, node: INode) {
  const oscillator: OscillatorNode = context.createOscillator();
  oscillator.frequency.setValueAtTime(Number(node.params.frequency), context.currentTime);
  oscillator.detune.setValueAtTime(Number(node.params.detune), context.currentTime);
  oscillator.start();
  return oscillator;
}