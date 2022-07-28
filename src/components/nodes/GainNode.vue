<script lang="ts">
import NodeWrapper from '@/interfaces/wrappers/NodeWrapper';
import ParamWrapper from '@/interfaces/wrappers/ParamWrapper';
import { Component, Prop, Vue } from 'vue-property-decorator';
import NumberParameter from '../params/NumberParameter.vue';

@Component({
  components: { NumberParameter }
})
export default class GainNode extends Vue {
  @Prop() node!: NodeWrapper;

  public mounted() {
    this.node.height = 125;
    this.node.width = 174;
  }

  public get gain(): ParamWrapper | undefined {
    return this.node.params.find(p => p.name == 'gain')
  }
}
</script>

<template>
  <div>
    <NumberParameter :param="gain" :increment=".1" :superIncrement="1" title="params.titles.gain"
      :dy="79" />
  </div>
</template>
