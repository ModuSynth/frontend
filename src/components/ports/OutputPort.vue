<script lang="ts">
import IPort from '@/interfaces/IPort';
import { PORT_RADIUS, PORT_TOP_MARGIN } from '@/utils/constants';
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class OutputPort extends Vue {
  @Prop() port!: IPort;

  public get radius() {
    return PORT_RADIUS
  }

  public get y() {
    return (((PORT_RADIUS * 2) + PORT_TOP_MARGIN) * this.port.index)
  }
}
</script>

<template>
  <circle :cx="0" :cy="y" :r="radius" stroke="#00FF00" stroke-width="2"></circle>
</template>