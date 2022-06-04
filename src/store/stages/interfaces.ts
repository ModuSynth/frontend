import IStage, { IStageDetails } from "@/interfaces/IStage";
import ICoordinates from "@/interfaces/utils/ICoordinates";
import { ActionContext } from "vuex"
import MainState from "../utils/MainState"
import { StageActionTypes as ActionTypes, StageMutationTypes as MutationTypes } from "./enums";

export interface IStageState {
  // The list of stages to display in the table on the main page.
  list: IStage[];
  // The stage displayed in the stage details.
  stage: IStageDetails;
  // If TRUE the whole stage is currently being dragged, if FALSE it is not.
  dragging: boolean;
  // The coordinates where the user started to drag the stage.
  dragOrigin: ICoordinates;
  // The zoom level of the whole canva.
  scale: number;
}

export type StageMutations<S = IStageState> = {
  [MutationTypes.SET_LIST](state: S, payload: IStage[]): void,
  [MutationTypes.SET_DETAILS](state: S, payload: IStageDetails): void;
  [MutationTypes.START_DRAG](state: S, payload: ICoordinates): void;
  [MutationTypes.MOVE_DRAG](state: S, payload: ICoordinates): void;
  [MutationTypes.END_DRAG](state: S): void;
}

export type StageContext = {
  commit<K extends keyof StageMutations>(
    key: K,
    payload: Parameters<StageMutations[K]>[1]
  ): ReturnType<StageMutations[K]>
} & Omit<ActionContext<IStageState, MainState>, 'commit'>;

export interface StageActions {
  [ActionTypes.FETCH_LIST](context: StageContext): Promise<IStage[]>;
  [ActionTypes.FETCH_ONE](content: StageContext, stageId: number): Promise<IStageDetails>;
}