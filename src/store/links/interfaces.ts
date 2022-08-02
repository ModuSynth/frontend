import { LinkActionTypes, LinkMutationTypes } from "./enums";
import LinkWrapper from "@/interfaces/wrappers/LinkWrapper";
import PortWrapper from "@/interfaces/wrappers/PortWrapper";
import ICoordinates from "@/interfaces/utils/ICoordinates";

export interface ILinkState {
  links: LinkWrapper[];
  startPort?: PortWrapper;
  dragCoordinates?: ICoordinates;
}

export type LinkActions = {
  [LinkActionTypes.FETCH_LIST](context: any): Promise<any>;
  [LinkActionTypes.DELETE_LINK](context: any, link: LinkWrapper): any;
  [LinkActionTypes.END_LINK](context: any, payload: PortWrapper): void;
}

export type LinkMutations<S = ILinkState> = {
  [LinkMutationTypes.ADD_LINK](state: S, payload: LinkWrapper): void;
  [LinkMutationTypes.REMOVE_LINK](state: S, payload: LinkWrapper): void;
  [LinkMutationTypes.START_LINK](state: S, payload: PortWrapper): void;
  [LinkMutationTypes.CANCEL_LINK](state: S): void;
}