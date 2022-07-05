export default interface IParam {
  name: string,
  value: string | number;
  /**
   * This indicates the Y difference between the top of the node, and the middle
   * Of the port the parameter link is connected to. We cannot really compute this
   * value as all parameters are not the exact same height
   */
  dy: number;
}