export default interface IParameter {
  name: string;
  type: string;
}

export interface INumberParameter extends IParameter {
  value: number;
}