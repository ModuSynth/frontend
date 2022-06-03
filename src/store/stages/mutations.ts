import IStage, { IStageDetails } from "@/interfaces/IStage";
import ICoordinates from "@/interfaces/utils/ICoordinates";
import { MutationTree } from "vuex";
import { StateTransformer } from "vuex-class/lib/bindings";
import { StageMutationTypes } from "./enums";
import { IStageState, StageMutations } from "./interfaces";

const mutations : MutationTree<IStageState> & StageMutations = {
  [StageMutationTypes.SET_LIST](state, payload: IStage[]) {
    state.list = payload;
  },
  [StageMutationTypes.SET_DETAILS](state, payload: IStageDetails) {
    state.stage = payload;
  },
  [StageMutationTypes.START_DRAG](state, payload: ICoordinates) {
    state.dragging = true;
    state.dragOrigin = payload;
  },
  [StageMutationTypes.MOVE_DRAG](state, payload: ICoordinates) {
    if (!state.dragging) return;

    const delta: ICoordinates = {
      x: payload.x - state.dragOrigin.x,
      y: payload.y - state.dragOrigin.y
    };
    state.dragOrigin = payload;

    state.stage.x += delta.x;
    state.stage.y += delta.y;
  },
  [StageMutationTypes.END_DRAG](state) {
    state.dragging = false;
  }
}

export default mutations;