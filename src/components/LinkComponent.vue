<script lang="ts">
import LinkWrapper from "@/interfaces/wrappers/LinkWrapper";
import NodeWrapper from "@/interfaces/wrappers/NodeWrapper";
import { NodePortWrapper, ParamPortWrapper } from "@/interfaces/wrappers/PortWrapper";
import { PORT_RADIUS, PORT_TOP_MARGIN } from "@/utils/constants";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class LinkComponent extends Vue {
    @Prop() link!: LinkWrapper;

    public get x1(): number {
        return this.link.from.node.x + this.link.from.node.width;
    }

    public get d(): number {
        return (2 * PORT_RADIUS + PORT_TOP_MARGIN)
    }

    public get y1(): number {
        return this.link.from.y;
    }

    public get y2(): number {
        return this.link.to.y;
    }

    public get x2(): number {
        return this.link.to.x
    }

    public get toNode(): NodeWrapper | undefined {
        if (this.link.to instanceof NodePortWrapper) return this.link.to.node;
        if (this.link.to instanceof ParamPortWrapper) return this.link.to.param.node;
    }
}
</script>

<template>
    <line :x1="x1" :x2="x2" :y1="y1" :y2="y2" stroke="#00FF00" stroke-width="3" />
</template>