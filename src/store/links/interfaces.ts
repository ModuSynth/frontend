import { LinkActionTypes, LinkMutationTypes } from "./enums";
import NodeWrapper from '@/interfaces/wrappers/NodeWrapper'
import ILink from "@/interfaces/api/ILink";
import LinkWrapper from "@/interfaces/wrappers/LinkWrapper";

export interface ILinkState {
  links: LinkWrapper[];
}

export type LinkActions = {
  [LinkActionTypes.FETCH_LIST](context: any): Promise<any>;
  [LinkActionTypes.DELETE_LINK](context: any, link: LinkWrapper): any;
}

export type LinkMutations<S = ILinkState> = {
  [LinkMutationTypes.ADD_LINK](state: S, payload: LinkWrapper): void;
  [LinkMutationTypes.REMOVE_LINK](state: S, payload: string): void;
}