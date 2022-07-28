import { MutationTree } from "vuex";
import { LinkMutationTypes } from "./enums";
import { ILinkState, LinkMutations } from "./interfaces";

const mutations: MutationTree<ILinkState> & LinkMutations = {
  [LinkMutationTypes.ADD_LINK](state, link) {
    
  },
  [LinkMutationTypes.REMOVE_LINK](state, id) {
    // const index: number = state.links.findIndex(l => l.id === id);
    // if (index > -1) {
    //   const found: ILink = state.links[index];
    //   found.from.node.waaNode.disconnect(found.to.node.waaNode);
    //   state.links.splice(index, 1);
    // }
  },
}

export default mutations;