import NodeWrapper from "@/interfaces/wrappers/NodeWrapper";

export default function createChannelMergerNode(context: AudioContext, node: NodeWrapper) {
    node.waaNode = context.createChannelMerger()
}