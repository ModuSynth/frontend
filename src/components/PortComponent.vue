<script lang="ts">
import PortWrapper, { NodePortWrapper } from "@/interfaces/wrappers/PortWrapper";
import { Component, Prop, Vue } from "vue-property-decorator";
import { PORT_RADIUS } from '@/utils/constants'

@Component
export default class NodePortComponent extends Vue {
    @Prop() port!: NodePortWrapper;

    public get radius(): number {
        return PORT_RADIUS
    }
}
</script>

<template>
    <circle :cx="0" :cy="0" :r="radius" stroke="#00FF00" stroke-width="2" />
</template>