<script lang="ts">
import INode from '@/interfaces/INode';
import { Component, Prop, Vue } from 'vue-property-decorator';
import NumberParameter from '../parameters/NumberParameter.vue'

@Component({
  components: { NumberParameter }
})
export default class GainNode extends Vue {
  @Prop() node!: INode;
}
</script>

<template>
  <g>
    <rect fill="black" stroke="#00FF00" stroke-width="3" width="215" height="90" x="0" y="O" />
    <text x="5" y="20" fill="#00FF00">Gain Node</text>
    <NumberParameter :parameter="node.parameters[0]" :index="0" />
  </g>
</template>