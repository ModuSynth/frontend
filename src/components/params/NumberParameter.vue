<script lang="ts">
import ns from '@/utils/ns';
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class NumberParameter extends Vue {
  @Prop() param!: AudioParam;

  @Prop({ default: 140 }) width!: number;

  @Prop({ default: 1 }) increment!: number;

  @Prop({ default: 10 }) superIncrement!: number;

  @Prop({ default: 0 }) min!: number;

  @Prop({ default: Infinity }) max!: number;

  @Prop({ default: 'params.titles.unknown' }) title!: string;

  @ns.stages.State("context") context!: AudioContext;

  public value: number = 0;

  public mounted() {
    this.value = this.param.value;
  }

  public setValue(newValue: number) {
    this.param.setValueAtTime(this.value, this.context.currentTime);
  }

  public changeValue(increment: number) {
    if (this.value + increment > this.max || this.value + increment < this.min) return;
    this.value = parseFloat(`${this.value}`) + increment;
    this.setValue(this.value);
  }

  public get widthStyle(): any {
    return {"--width": `${this.width}px`}
  }
}
</script>

<template>
  <div class="param-container" :style="widthStyle">
    <div class="param-title">{{ $t(title) }}</div>
    <a class="param-button margin-right" @click="changeValue(-superIncrement)"><v-icon small>mdi-chevron-double-left</v-icon></a>
    <a class="param-button margin-right" @click="changeValue(-increment)"><v-icon small>mdi-chevron-left</v-icon></a>
    <input type="text" class="param-input" v-model="value" @change="setValue" />
    <a class="param-button margin-left" @click="changeValue(increment)"><v-icon small>mdi-chevron-right</v-icon></a>
    <a class="param-button margin-left" @click="changeValue(superIncrement)"><v-icon small>mdi-chevron-double-right</v-icon></a>
  </div>
</template>

<style scoped>
.param-container {
  width: var(--width);
  background-color: black;
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
</style>