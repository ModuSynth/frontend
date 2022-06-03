import StagesFactory from "@/factories/StagesFactory";
import { IStageState } from "./interfaces";

const state: IStageState = {
  list: [],
  stage: StagesFactory.empty(),
  dragging: false,
  dragOrigin: { x: 0, y: 0 }
}

export default state;