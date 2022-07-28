import ILinkDetails from "@/interfaces/api/ILinkDetails";
import LinkWrapper from "@/interfaces/wrappers/LinkWrapper";
import PortWrapper, { NodePortWrapper } from "@/interfaces/wrappers/PortWrapper";
import axios from "axios";
import { ActionTree } from "vuex";
import MainState from "../utils/MainState";
import { LinkActionTypes, LinkMutationTypes } from "./enums";
import { ILinkState, LinkActions } from "./interfaces";

const actions: ActionTree<ILinkState, MainState> & LinkActions = {
  [LinkActionTypes.FETCH_LIST]({ commit, rootGetters }) {
    return axios.get(`http://localhost:3000/links`).then(({ data }) => {
      const ports: PortWrapper[] = rootGetters['nodes/PORTS'];
      data.forEach((link: ILinkDetails) => {
        const from: PortWrapper|undefined = ports.find((p: PortWrapper) => p.id === link.from);
        const to: PortWrapper|undefined = ports.find((p: PortWrapper) => p.id === link.to);
        if (from !== undefined && to !== undefined) {
          commit(LinkMutationTypes.ADD_LINK, new LinkWrapper(link.id, from as NodePortWrapper, to));
        }
      });
    });
  },
  [LinkActionTypes.DELETE_LINK]({ commit }, link) {
    return axios.delete(`http://localhost:3000/links/${link.id}`).then(() => {
      commit(LinkMutationTypes.REMOVE_LINK, link.id);
    })
  },
}

export default actions;