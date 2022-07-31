import ILink from "@/interfaces/api/ILink";
import LinkWrapper from "@/interfaces/wrappers/LinkWrapper";
import PortWrapper, { NodePortWrapper } from "@/interfaces/wrappers/PortWrapper";
import { API_URL } from "@/utils/constants";
import axios from "axios";
import { ActionTree } from "vuex";
import MainState from "../utils/MainState";
import { LinkActionTypes, LinkMutationTypes } from "./enums";
import { ILinkState, LinkActions } from "./interfaces";

const actions: ActionTree<ILinkState, MainState> & LinkActions = {
  [LinkActionTypes.FETCH_LIST]({ commit, rootGetters }) {
    return axios.get(`${API_URL}/links`).then(({ data }) => {
      const ports: PortWrapper[] = rootGetters['nodes/PORTS'];
      data.forEach((link: ILink) => {
        const from: PortWrapper|undefined = ports.find((p: PortWrapper) => p.id === link.from);
        const to: PortWrapper|undefined = ports.find((p: PortWrapper) => p.id === link.to);
        if (from !== undefined && to !== undefined) {
          commit(LinkMutationTypes.ADD_LINK, new LinkWrapper(link.id, from as NodePortWrapper, to));
        }
      });
    });
  },
  [LinkActionTypes.DELETE_LINK]({ commit }, link) {
    return axios.delete(`${API_URL}/links/${link.id}`).then(() => {
      commit(LinkMutationTypes.REMOVE_LINK, link);
    })
  },
  [LinkActionTypes.END_LINK]({ state, commit }, endPort) {
    const payload: any = {
      from: state.startPort.id,
      to: endPort.id
    }
    return axios.post(`${API_URL}/links`, payload).then(({ data }) => {
      const wrapper: LinkWrapper = new LinkWrapper(data.id, state.startPort as NodePortWrapper, endPort)
      commit(LinkMutationTypes.ADD_LINK, wrapper);
    })
  },
}

export default actions;