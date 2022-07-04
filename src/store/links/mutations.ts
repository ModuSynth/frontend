import INode from "@/interfaces/INode";
import { MutationTree } from "vuex";
import { LinkMutationTypes } from "./enums";
import { ILinkState, LinkMutations } from "./interfaces";

const mutations: MutationTree<ILinkState> & LinkMutations = {
  [LinkMutationTypes.ADD_LINK](state, link) {
    const nodes: INode[] = (this.state as any).nodes.nodes;
    const from: INode | undefined = nodes.find(n => n.id == link.from.id)
    const to: INode | undefined = nodes.find(n => n.id == link.to.id)
    if (from !== undefined && to !== undefined) {
      state.links.push({
        id: link.id,
        from: { node: from, index: link.from.index },
        to: { node: to, index: link.to.index }
      })
      from.waaNode.connect(to.waaNode, link.to.index, link.from.index)
    }
  }
}

export default mutations;