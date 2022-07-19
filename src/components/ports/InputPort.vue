<script lang="ts">
import Port from '@/interfaces/implementations/Port';
import { PORT_RADIUS, PORT_TOP_MARGIN } from '@/utils/constants';
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class InputPort extends Vue {
  @Prop() port!: Port;

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