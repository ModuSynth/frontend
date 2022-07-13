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
      from.waaNode.connect(to.waaNode, link.from.index, link.to.index)
    }
  },
  [LinkMutationTypes.ADD_PARAM_LINK](state, link) {
    const nodes: INode[] = (this.state as any).nodes.nodes;
    const from: INode | undefined = nodes.find(n => n.id == link.from.id);
    const split: string[] = link.to.id.split('::');
    const to: INode | undefined = nodes.find(n => n.id == split[0]);
    if (from !== undefined && to !== undefined) {
      state.paramLinks.push({
        id: link.id,
        from: { node: from, index: link.from.index },
        to: { node: to, index: link.to.index },
        paramName: split[1]
      });
      from.waaNode.connect((to.waaNode as any)[split[1]])
    }
  }
}

export default mutations;