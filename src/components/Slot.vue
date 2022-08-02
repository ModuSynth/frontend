<script lang="ts">
import { RACK_HEIGHT, SLOT_SIZE } from '@/utils/constants';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class RackSlot extends Vue {
  @Prop({ default: 0 }) index!: number;

  public get slotSize(): number {
    return SLOT_SIZE;
  }

  public get yBottom(): number {
    return RACK_HEIGHT - SLOT_SIZE;
  }

  public mouseenter($event: MouseEvent) {
    console.log(`Entering ${this.index}`)
  }
}
</script>

<template>
  <g :transform="`translate(${index * slotSize} 0)`" @mouseenter="mouseenter">
    <g class="top-screw">
      <rect x="0" y="0" :width="slotSize" :height="slotSize" fill="silver" stroke="black" />
      <circle :cx="slotSize / 2" :cy="slotSize / 2" :r="slotSize / 4" fill="black" />
    </g>
    <rect class="slot-filler" x="0" :y="slotSize" :height="yBottom - slotSize" :width="slotSize" />
    <g class="bottom-screw" :transform="`translate(0 ${yBottom})`">
      <rect x="0" y="0" :width="slotSize" :height="slotSize" fill="silver" stroke="black" />
      <circle :cx="slotSize / 2" :cy="slotSize / 2" :r="slotSize / 4" fill="black" />
    </g>
  </g>
</template>