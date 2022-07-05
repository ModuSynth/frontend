<script lang="ts">
import INode from '@/interfaces/INode';
import IParam from '@/interfaces/IParam';
import { NodeActionTypes } from '@/store/nodes/enums';
import ns from '@/utils/ns';
import { Component, Vue, Prop, PropSync } from 'vue-property-decorator';

/**
 * This wrapper wraps a numeric value corresponding to a parameter on a node.
 * It provides methods and actionners to increase or decrase the value of a
 * given amount. The user can edit the value manually too for more precision.
 * @author Vincent Courtois <courtois.vincent@outlook.com>
 */
@Component
export default class NumberParameter extends Vue {

  @Prop() node!: INode;

  /**
   * The node the parameter is declared on. The parameter is not directly given
   * because we'd still need his name and we need the inner wrapped WAA node.
   */
  @Prop() param!: IParam;
  /**
   * The string name of the parameter, used to find it in the parameters object
   * and in the parameters of the wrapped AudioNode.
   */
  @Prop() paramName!: keyof AudioNode;
  /**
   * The amount the value will be increased or decreased with when pressing the
   * inner buttons in the controls. This SHOULD be lower than superIncrement.
   */
  @Prop({ default: 1 }) increment!: number;
  /**
   * The amount the value will be increased or decreased with when pressing the
   * outer buttons in the controls. This SHOULD be creater than increment.
   */
  @Prop({ default: 10 }) superIncrement!: number;
  /**
   * The minimum numerical value this control can have. If lower than this, the
   * value will NOT be applied, and minimum value will be used instead.
   */
  @Prop({ default: 0 }) min!: number;
  /**
   * The maximum numerical value this control can have. If greater than this, the
   * value will NOT be applied, and maximum value will be used instead.
   */
  @Prop({ default: Infinity }) max!: number;
  /**
   * The translation key to use for the title of the parameter.
   */
  @Prop({ default: 'params.titles.unknown' }) title!: string;

  @ns.stages.State("context") context!: AudioContext;

  @ns.nodes.Action(NodeActionTypes.SAVE_PARAMS) saveParams: any;


  /**
   * Applies the current value of the parameter wrapper to the wrapped Audio
   * Parameter by using the correct mutation method. The context we use here MUST be
   * the same context that created the node.
   */
  public applyValue() {
    this.innerParam.setValueAtTime(Number(this.param.value), this.context.currentTime);
    this.saveParams(this.node);
  }

  public get innerParam(): AudioParam {
    return this.node.waaNode[this.param.name as unknown as keyof AudioNode] as unknown as AudioParam
  }

  /**
   * Changes the value of the parameter wrapper and applies this change to the wrapped
   * Audio Parameter afterhand.
   * @param increment The amount the value will be changed of.
   */
  public changeValue(increment: number) {
    this.param.value = Math.max(Math.min(Number(this.param.value) + increment, this.max), this.min);
    this.applyValue();
  }
}
</script>

<template>
  <div class="param-wrapper">
    <div class="param-port"></div>
    <div class="param-container">
      <div class="param-title">{{ $t(title) }}</div>
      <a class="param-button margin-right" @click="changeValue(-superIncrement)"><v-icon small>mdi-chevron-double-left</v-icon></a>
      <a class="param-button margin-right" @click="changeValue(-increment)"><v-icon small>mdi-chevron-left</v-icon></a>
      <input type="text" class="param-input" v-model="param.value" @change="applyValue" />
      <a class="param-button margin-left" @click="changeValue(increment)"><v-icon small>mdi-chevron-right</v-icon></a>
      <a class="param-button margin-left" @click="changeValue(superIncrement)"><v-icon small>mdi-chevron-double-right</v-icon></a>
    </div>
  </div>
</template>

<style scoped>
.param-container {
  margin-left: 10px;
  width: calc(100% - 10px);
  background-color: black;
  border: 1px solid #00FF00;
  margin-top: 5px;
  padding: 5px;
  padding-top: 2px;
}
.param-container > a > i {
  color: #00FF00;
}
.param-button {
  width: 15%;
  text-align: center;
}
.param-input {
  width: 28%;
}
.param-button, .param-input {
  border: 1px solid #00FF00;
  display: inline-block;
  text-align: center;
}
.param-button, .param-input, .param-title {
  color: #00FF00;
}
.param-button.margin-left {
  margin-left: 3%;
}
.param-button.margin-right {
  margin-right: 3%;
}

.param-wrapper {
  position: relative;
}

.param-port {
  height: 20px;
  width: 10px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  border: 2px solid #00FF00;
  border-right: none;
  position: absolute;
  top: 15px;
}
</style>