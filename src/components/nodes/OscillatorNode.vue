<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import NumberParameter from '../params/NumberParameter.vue';
import ListParameter from '../params/ListParameter.vue';
import NodeWrapper from '@/interfaces/wrappers/NodeWrapper';
import ParamWrapper from '@/interfaces/wrappers/ParamWrapper';
import { AUDIO_CONTEXT } from '@/utils/constants';

@Component({
  components: { ListParameter, NumberParameter }
})
export default class OscillatorNodeComponent extends Vue {
  @Prop() node!: NodeWrapper;

  public mounted() {
    this.node.height = 210;
    this.node.width = 164;
  }

  public get wrappedNode(): OscillatorNode {
    return (this.node.waaNode as unknown as OscillatorNode);
  }

  public get frequency(): ParamWrapper | undefined {
    return this.node.params.find(p => p.name == "frequency")
  }

  public get detune(): ParamWrapper | undefined {
    return this.node.params.find(p => p.name == "detune")
  }

  public get type(): ParamWrapper | undefined {
    return this.node.params.find(p => p.name == "type")
  }

  public get context(): AudioContext {
    return AUDIO_CONTEXT;
  }
}
</script>

<template>
  <div @mousedown.stop>
    <ListParameter :values="['sine', 'triangle', 'square', 'sawtooth']" :param="type" />
    <NumberParameter
      :param="frequency"
      :increment="1"
      :superIncrement="10"
      :max="context.sampleRate / 2"
      :min="0"
      :dy="110"
      title="params.titles.frequency"
    />
    <NumberParameter
      :param="detune"
      :increment="10"
      :superIncrement="100"
      :max="153600"
      :min="-153600"
      :dy="175"
      title="params.titles.detune"
    />
  </div>
</template>