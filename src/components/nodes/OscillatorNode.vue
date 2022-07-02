<script lang="ts">
import INode from '@/interfaces/INode';
import ns from '@/utils/ns';
import { Component, Prop, Vue } from 'vue-property-decorator';
import NumberParameter from '../params/NumberParameter.vue';

@Component({
  components: { NumberParameter }
})
export default class OscillatorNodeComponent extends Vue {
  @Prop() node!: INode;

  @ns.stages.State("context") context!: AudioContext;

  public mounted() {
    this.node.height = 160;
    this.node.width = 164;
  }

  public get wrappedNode(): OscillatorNode {
    return (this.node.waaNode as unknown as OscillatorNode);
  }

  public get frequency(): AudioParam {
    return this.wrappedNode.frequency
  }

  public get detune(): AudioParam {
    return this.wrappedNode.detune
  }
}
</script>

<template>
  <div>
    <NumberParameter
      :param="frequency"
      :increment="1"
      :superIncrement="10"
      :max="context.sampleRate / 2"
      :min="0"
      title="params.titles.frequency"
    />
    <NumberParameter
      :param="detune"
      :increment="10"
      :superIncrement="100"
      :max="153600"
      :min="-153600"
      title="params.titles.detune"
    />
  </div>
</template>