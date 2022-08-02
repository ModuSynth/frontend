<template>
  <g>
    <g v-for="place in slots" :key="place">
      <RackSlot :index="place - 1"/>
    </g>
  </g>
</template>

<script lang="ts">
import { SLOT_COUNT, SLOT_SIZE } from '@/utils/constants';
import { Component, Prop, Vue } from 'vue-property-decorator';
import RackSlot from "./Slot.vue"

@Component({
  components: { RackSlot }
})
export default class Rack extends Vue {
  @Prop({ default: SLOT_COUNT }) slots!: number;
  public get size(): number {
    return SLOT_SIZE
  }
  public get width(): number {
    return this.slots * SLOT_SIZE;
  }

  public get height(): number {
    return SLOT_SIZE;
  }
}
</script>

<style>

</style>