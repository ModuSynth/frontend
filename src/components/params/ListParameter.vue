<script lang="ts">
import INode from '@/interfaces/INode';
import IParam from '@/interfaces/IParam';
import { NodeActionTypes } from '@/store/nodes/enums';
import ns from '@/utils/ns';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ListParameter extends Vue {

  @Prop() node!: INode;

  @Prop() paramName!: string;

  @Prop({ default: () => [] }) values!: string[]

  @ns.nodes.Action(NodeActionTypes.SAVE_PARAMS) saveParams: any;

  public get innerNode(): any {
    return this.node.waaNode as unknown as AudioNode;
  }

  public get value(): string {
    return this.innerNode[this.paramName] as unknown as string
  }

  public set value(newValue: string) {
    const param: IParam | undefined = this.node.params.find(p => p.name == this.paramName)
    if (param !== undefined)  {
      param.value = newValue;
    }
    this.innerNode[this.paramName] = newValue;
    this.saveParams(this.node);
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