<script lang="ts">
import INode from '@/interfaces/INode';
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

  public get gain(): AudioParam {
    return (this.node.waaNode as unknown as GainNode).gain
  }
}
</script>

<template>
  <div>
    <NumberParameter :param="gain" :increment=".1" :superIncrement="1" title="params.titles.gain" />
  </div>
</template>
