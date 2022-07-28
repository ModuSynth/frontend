<script lang="ts">
import ParamWrapper from '@/interfaces/wrappers/ParamWrapper';
import { NodeActionTypes } from '@/store/nodes/enums';
import ns from '@/utils/ns';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ListParameter extends Vue {
  @Prop() param!: ParamWrapper;

  @Prop({ default: () => [] }) values!: string[]

  @ns.nodes.Action(NodeActionTypes.SAVE_PARAMS) saveParams: any;

  public get value(): string {
    return `${this.param.value}`
  }

  public set value(newValue: string) {
    this.param.value = newValue;
    this.saveParams(this.param.node);
  }
}
</script>

<template>
  <div class="param-container">
    <select v-model="value">
      <option v-for="v in values">{{ v }}</option>
    </select>
  </div>
</template>

<style scoped>
.param-container {
  color: #00FF00;
}

.param-container select {
  width: 100%;
  color: #00FF00;
  border: 1px solid #00FF00;
  padding-left: 5px;
}
</style>