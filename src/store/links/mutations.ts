import { MutationTree } from "vuex";
import { LinkMutationTypes } from "./enums";
import { ILinkState, LinkMutations } from "./interfaces";

const mutations: MutationTree<ILinkState> & LinkMutations = {
  [LinkMutationTypes.ADD_LINK](state, link) {
    
  },
  [LinkMutationTypes.ADD_PARAM_LINK](state, link) {
    // const nodes: NodeWrapper[] = (this.state as any).nodes.nodes;
    // const split: string[] = link.to.id.split('::');
    // const from: INodeDetails = findNode(nodes, link.from.id);
    // const to: INodeDetails = findNode(nodes, split[0]);
    // state.paramLinks.push({
    //   id: link.id,
    //   from: findPort(from.outputs, link.from.index),
    //   to: findPort(to.inputs, link.to.index),
    //   paramName: split[1]
    // });
    // from.waaNode.connect((to.waaNode as any)[split[1]])
  },
  [LinkMutationTypes.REMOVE_LINK](state, id) {
    // const index: number = state.links.findIndex(l => l.id === id);
    // if (index > -1) {
    //   const found: ILink = state.links[index];
    //   found.from.node.waaNode.disconnect(found.to.node.waaNode);
    //   state.links.splice(index, 1);
    // }
  },
  [LinkMutationTypes.REMOVE_PARAM_LINK](state, link) {
    // const param: AudioParam = link.to.node.waaNode[link.paramName as unknown as keyof AudioNode] as unknown as AudioParam;
    // link.from.node.waaNode.disconnect(param);
    // state.paramLinks.splice(findIndex(state.paramLinks, {id: link.id}), 1);
  }
}

export default mutations;