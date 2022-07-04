import ILink, { IApiLink } from "@/interfaces/ILink";
import { LinkActionTypes, LinkMutationTypes } from "./enums";

export interface ILinkState {
  links: ILink[];
}

export type LinkActions = {
  [LinkActionTypes.FETCH_LIST](context: any): any;
}

export type LinkMutations<S = ILinkState> = {
  [LinkMutationTypes.ADD_LINK](state: S, payload: IApiLink): void;
}