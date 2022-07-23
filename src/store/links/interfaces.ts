import ILink, { IApiLink, IParamLink } from "@/interfaces/ILink";
import { LinkActionTypes, LinkMutationTypes } from "./enums";
import Node from '@/interfaces/implementations/Node'

export interface ILinkState {
  links: ILink[];
  paramLinks: IParamLink[];
}

export type LinkActions = {
  [LinkActionTypes.FETCH_LIST](context: any): any;
  [LinkActionTypes.DELETE_LINK](context: any, link: ILink): any;
  [LinkActionTypes.DELETE_PARAM_LINK](context: any, link: IParamLink): any;
  [LinkActionTypes.DELETE_PARAM_LINKS](context: any, node: Node): any;
}

export type LinkMutations<S = ILinkState> = {
  [LinkMutationTypes.ADD_LINK](state: S, payload: IApiLink): void;
  [LinkMutationTypes.ADD_PARAM_LINK](state: S, payload: IApiLink): void;
  [LinkMutationTypes.REMOVE_LINK](state: S, payload: string): void;
  [LinkMutationTypes.REMOVE_PARAM_LINK](state: S, payload: IParamLink): void;
}