import createGainNode from "./GainNode";
import createOscillatorNode from "./OscillatorNode";
import createOutputNode from "./OutputNode";

const factories = {
  GainNode: createGainNode,
  OscillatorNode: createOscillatorNode,
  OutputNode: createOutputNode
}

export default factories;