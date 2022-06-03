import StagesFactory from "@/factories/StagesFactory";
import { IStageState } from "./interfaces";

const state: IStageState = {
  list: [],
  stage: StagesFactory.empty()
}

export default state;