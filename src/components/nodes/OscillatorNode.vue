<script lang="ts">
import INode from '@/interfaces/INode';
import ns from '@/utils/ns';
import { Component, Prop, Vue } from 'vue-property-decorator';
import NumberParameter from '../params/NumberParameter.vue';
import ListParameter from '../params/ListParameter.vue';
import IParam from '@/interfaces/IParam';

@Component({
  components: { ListParameter, NumberParameter }
})
export default class OscillatorNodeComponent extends Vue {
  @Prop() node!: INode;

  @ns.stages.State("context") context!: AudioContext;

  public mounted() {
    this.node.height = 190;
    this.node.width = 164;
  }

  public get wrappedNode(): OscillatorNode {
    return (this.node.waaNode as unknown as OscillatorNode);
  }

  public get frequency(): IParam | undefined {
    return this.node.params.find(p => p.name == "frequency")
  }

  public get detune(): IParam | undefined {
    return this.node.params.find(p => p.name == "detune")
  }
}
</script>

<template>
  <div @mousedown.stop>
    <ListParameter :node="node" paramName="type" :values="['sine', 'triangle', 'square', 'sawtooth']" />
    <NumberParameter
      :node="node"
      paramName="frequency"
      :param="frequency"
      :increment="1"
      :superIncrement="10"
      :max="context.sampleRate / 2"
      :min="0"
      title="params.titles.frequency"
    />
    <NumberParameter
      :node="node"
      paramName="detune"
      :param="detune"
      :increment="10"
      :superIncrement="100"
      :max="153600"
      :min="-153600"
      title="params.titles.detune"
    />
  </div>
</template>