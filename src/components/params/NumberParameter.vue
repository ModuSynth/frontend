<script lang="ts">
import { NumberParameter } from '@/interfaces/wrappers/ParamWrapper';
import { NodeActionTypes } from '@/store/nodes/enums';
import ns from '@/utils/ns';
import { Component, Vue, Prop } from 'vue-property-decorator';

/**
 * This wrapper wraps a numeric value corresponding to a parameter on a node.
 * It provides methods and actionners to increase or decrase the value of a
 * given amount. The user can edit the value manually too for more precision.
 * @author Vincent Courtois <courtois.vincent@outlook.com>
 */
@Component
export default class NumberParameterComponent extends Vue {

  /**
   * The number of pixel, in the Y axis, from the top of the node to the middle
   * of the port linked to this parameter. It makes the computation of parameters
   * links coordinates easier by setting it in a dedicated place.
   */
  @Prop({ default: 0 }) dy!: number;
  /**
   * The node the parameter is declared on. The parameter is not directly given
   * because we'd still need his name and we need the inner wrapped WAA node.
   */
  @Prop() param!: NumberParameter;
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

  public get value() {
    return this.param.value
  }

  public set value(val: any) {
    this.param.value = Math.max(Math.min(val, this.max), this.min)
    this.saveParams(this.param.node);
  }

  public mounted() {
    this.param.dy = this.dy;
  }
}
</script>

<template>
  <div class="param-wrapper">
    <div class="param-port"></div>
    <div class="param-container">
      <div class="param-title">{{ $t(title) }}</div>
      <a class="param-button margin-right" @click="value -= superIncrement"><v-icon small>mdi-chevron-double-left</v-icon></a>
      <a class="param-button margin-right" @click="value -= increment"><v-icon small>mdi-chevron-left</v-icon></a>
      <input type="text" class="param-input" v-model="value" />
      <a class="param-button margin-left" @click="value += increment"><v-icon small>mdi-chevron-right</v-icon></a>
      <a class="param-button margin-left" @click="value += superIncrement"><v-icon small>mdi-chevron-double-right</v-icon></a>
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
  top: 20px;
}
</style>