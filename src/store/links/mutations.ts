import { reject, remove } from "lodash";
import { MutationTree } from "vuex";
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
    console.log("Starting the drag");
    state.startPort = payload;
  },
  [LinkMutationTypes.CANCEL_LINK](state) {
    console.log("cancelling the drag");
    state.startPort = undefined;
  },
}

export default mutations;