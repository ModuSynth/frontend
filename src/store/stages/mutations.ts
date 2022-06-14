import IStage, { IStageDetails } from "@/interfaces/IStage";
import ICoordinates from "@/interfaces/utils/ICoordinates";
import { MAX_ZOOM_IN, MAX_ZOOM_OUT, ZOOM_RATIO } from "@/utils/constants";
import { MutationTree } from "vuex";
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
  },
  [StageMutationTypes.SET_SCALE](state, delta) {
    state.scale += delta * -ZOOM_RATIO;
    state.scale = Math.min(Math.max(MAX_ZOOM_OUT, Math.abs(state.scale)), MAX_ZOOM_IN);
  },
  [StageMutationTypes.ADD_STAGE](state, stage) {
    state.list.push(stage);
  },
  [StageMutationTypes.CREATE_CONTEXT](state) {
    console.log('passage')
    state.context = new AudioContext();
    console.log((this.state as any).nodes)
  }
}

export default mutations;