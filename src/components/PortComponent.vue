<script lang="ts">
import { NodePortWrapper } from "@/interfaces/wrappers/PortWrapper";
import { Component, Prop, Vue } from "vue-property-decorator";
import { PORT_RADIUS, PORT_TOP_MARGIN } from '@/utils/constants'
import ns from "@/utils/ns";
import { LinkActionTypes, LinkMutationTypes } from "@/store/links/enums";

@Component
export default class NodePortComponent extends Vue {
    @Prop() port!: NodePortWrapper;

    @Prop() index!: number;

    @ns.links.Mutation(LinkMutationTypes.START_LINK) startLink: any;

    @ns.links.Action(LinkActionTypes.END_LINK) endLink: any;

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
    <circle
        :cx="port.x"
        :cy="port.y"
        :r="r"
        stroke="#00FF00"
        stroke-width="2"
        @mousedown.stop="startLink(port)"
        @mousemove.prevent.stop
        @mouseup.stop="endLink(port)"
    />
</template>