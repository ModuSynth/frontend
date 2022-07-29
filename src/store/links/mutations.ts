import { MutationTree } from "vuex";
import { LinkMutationTypes } from "./enums";
import { ILinkState, LinkMutations } from "./interfaces";

const mutations: MutationTree<ILinkState> & LinkMutations = {
  [LinkMutationTypes.ADD_LINK](state, link) {
    state.links.push(link);
  },
  [LinkMutationTypes.REMOVE_LINK](state, id) {
  },
}

export default mutations;