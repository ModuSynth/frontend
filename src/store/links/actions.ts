import { IApiLink } from "@/interfaces/ILink";
import INode from "@/interfaces/INode";
import axios from "axios";
import { ActionTree } from "vuex";
import MainState from "../utils/MainState";
import { LinkActionTypes, LinkMutationTypes } from "./enums";
import { ILinkState, LinkActions } from "./interfaces";

const actions: ActionTree<ILinkState, MainState> & LinkActions = {
  [LinkActionTypes.FETCH_LIST]({ commit }) {
    const nodes: INode[] = (this.state as any).nodes.nodes;
    return axios.get(`http://localhost:3000/links`).then(({ data }) => {
      data.forEach((link: IApiLink) => commit(LinkMutationTypes.ADD_LINK, link));
    });
  }
}

export default actions;