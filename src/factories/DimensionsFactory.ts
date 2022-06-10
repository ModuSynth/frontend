type DimensionsConfig = {
  [key: string]: { width: number, height: number}
}

/**
 * This factory gives the dimensions of nodes. Dimensions are the same for each
 * instance of a type of nodes as all jodes of a same type have the same ports
 * and parameters, the same height and the same width.
 * @author Vincent Courtois <courtois.vincent@outlook.com>
 */
class DimensionsFactory {
  private config: DimensionsConfig = {
    GainNode: { width: 160, height: 160 },
    OscillatorNode: { width: 100, height: 100 }
  }
  public width(type: keyof DimensionsConfig): number {
    return this.config[type].width;
  }
  public height(type: keyof DimensionsConfig): number {
    return this.config[type].width;
  }
}

const factory = new DimensionsFactory();

export default factory;