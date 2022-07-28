import ILinkDetails from "@/interfaces/api/ILinkDetails";
import { IParamLink } from "@/interfaces/ILink";
import axios from "axios";
import { ActionTree } from "vuex";
import MainState from "../utils/MainState";
import { LinkActionTypes, LinkMutationTypes } from "./enums";
import { ILinkState, LinkActions } from "./interfaces";
import state from "./state";

const actions: ActionTree<ILinkState, MainState> & LinkActions = {
  [LinkActionTypes.FETCH_LIST]({ commit, rootGetters }) {
    console.log(rootGetters['nodes/PORTS'])
    return axios.get(`http://localhost:3000/links`).then(({ data }) => {
      data.forEach((link: ILinkDetails) => {
        commit(LinkMutationTypes.ADD_LINK, link);
      });
    });
  },
  [LinkActionTypes.DELETE_LINK]({ commit }, link) {
    return axios.delete(`http://localhost:3000/links/${link.id}`).then(() => {
      commit(LinkMutationTypes.REMOVE_LINK, link.id);
    })
  },
  [LinkActionTypes.DELETE_PARAM_LINK]({ commit }, link) {
    return axios.delete(`http://localhost:3000/links/${link.id}`).then(() => {
      commit(LinkMutationTypes.REMOVE_PARAM_LINK, link);
    })
  },
  [LinkActionTypes.DELETE_PARAM_LINKS]({ dispatch }, node) {
    // state.paramLinks.forEach((l: IParamLink) => {
    //   if (l.to.node.id === node.id) {
    //     dispatch(LinkActionTypes.DELETE_PARAM_LINK, l)
    //   }
    // })
  }
}

export default actions;