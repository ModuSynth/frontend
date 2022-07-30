<script lang="ts">
import { NodePortWrapper } from "@/interfaces/wrappers/PortWrapper";
import { Component, Prop, Vue } from "vue-property-decorator";
import { PORT_RADIUS, PORT_TOP_MARGIN } from '@/utils/constants'

@Component
export default class NodePortComponent extends Vue {
    @Prop() port!: NodePortWrapper;

    @Prop() index!: number;

    public get r(): number {
        return PORT_RADIUS
    }

    public get d(): number {
        return 2 * this.r
    }

    public get interval(): number {
        return PORT_TOP_MARGIN
    }

    public get cy(): number {
        return (this.d + this.interval) * this.port.index
    }
}
</script>

<template>
    <circle :cx="port.x" :cy="port.y" :r="r" stroke="#00FF00" stroke-width="2" />
</template>