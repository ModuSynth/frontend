import { IStageDetails } from "@/interfaces/IStage";

export default class StagesFactory {
  public static empty(): IStageDetails {
    return { id: '', name: '', x: 0, y: 0 }
  }
}