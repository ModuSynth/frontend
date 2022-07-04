import INode from "@/interfaces/INode";

export default function createOscillatorNode(context: AudioContext, node: INode) {
  const oscillator: OscillatorNode = context.createOscillator();
  console.log(node.params);
  oscillator.frequency.setValueAtTime(Number(node.params.find(p => p.name == 'frequency')?.value), context.currentTime);
  oscillator.detune.setValueAtTime(Number(node.params.find(p => p.name == 'detune')?.value), context.currentTime);
  oscillator.type = `${node.params.find(p => p.name == 'type')?.value}` as OscillatorType;
  oscillator.start();
  return oscillator;
}