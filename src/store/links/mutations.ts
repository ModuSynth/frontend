import { reject, remove } from "lodash";
import { MutationTree } from "vuex";
import links from ".";
import { LinkMutationTypes } from "./enums";
import { ILinkState, LinkMutations } from "./interfaces";

const mutations: MutationTree<ILinkState> & LinkMutations = {
  [LinkMutationTypes.ADD_LINK](state, link) {
    state.links.push(link);
  },
  [LinkMutationTypes.REMOVE_LINK](state, link) {
    state.links = reject(state.links, { id: link.id });
  },
  [LinkMutationTypes.START_LINK](state, payload) {
  },
  [LinkMutationTypes.CANCEL_LINK](state) {

  },
  [LinkMutationTypes.END_LINK](state, payload) {

  },
}

export default mutations;