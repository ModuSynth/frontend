<script lang="ts">
import INode from '@/interfaces/INode';
import IParam from '@/interfaces/IParam';
import { Component, Prop, Vue } from 'vue-property-decorator';
import NumberParameter from '../params/NumberParameter.vue';

@Component({
  components: { NumberParameter }
})
export default class GainNode extends Vue {
  @Prop() node!: INode;

  public mounted() {
    this.node.height = 110;
    this.node.width = 164;
  }

  public get gain(): IParam | undefined {
    return this.node.params.find(p => p.name == 'gain')
  }
}
</script>

<template>
  <div>
    <NumberParameter :node="node" paramName="gain" :param="gain" :increment=".1" :superIncrement="1" title="params.titles.gain" />
  </div>
</template>
