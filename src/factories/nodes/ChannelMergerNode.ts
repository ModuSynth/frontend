import INode from "@/interfaces/INode";

export default function createChannelMergerNode(context: AudioContext, node: INode): ChannelMergerNode {
    return context.createChannelMerger()
}