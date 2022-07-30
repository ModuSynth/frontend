import createChannelMergerNode from "./ChannelMergerNode";
import createDelayNode from "./DelayNode";
import createGainNode from "./GainNode";
import createOscillatorNode from "./OscillatorNode";
import createOutputNode from "./OutputNode";

const factories = {
  DelayNode: createDelayNode,
  GainNode: createGainNode,
  OscillatorNode: createOscillatorNode,
  OutputNode: createOutputNode,
  ChannelMergerNode: createChannelMergerNode
}

export default factories;