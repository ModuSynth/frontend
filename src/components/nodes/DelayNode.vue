<script lang="ts">
import NodeWrapper from '@/interfaces/wrappers/NodeWrapper';
import ParamWrapper from '@/interfaces/wrappers/ParamWrapper';
import { Component, Prop, Vue } from 'vue-property-decorator';
import NumberParameter from '../params/NumberParameter.vue';

@Component({
  components: { NumberParameter }
})
export default class DelayNode extends Vue {
  @Prop() node!: NodeWrapper;

  public mounted() {
    this.node.height = 125;
    this.node.width = 174;
  }

  public get delayTime(): ParamWrapper | undefined {
    return this.node.params.find(p => p.name == 'delayTime')
  }
}
</script>

<template>
  <div>
    <NumberParameter :param="delayTime" :increment=".1" :superIncrement="1" :dy="85" title="params.titles.delayTime" />
  </div>
</template>
