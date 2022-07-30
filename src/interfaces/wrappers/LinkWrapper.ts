import PortWrapper, { NodePortWrapper } from "./PortWrapper";

export default class LinkWrapper {
    public from: NodePortWrapper;
    public to: PortWrapper;

    public readonly id: string;

    public constructor(id: string, from: NodePortWrapper, to: PortWrapper) {
        this.id = id;
        this.from = from;
        this.to = to;
        to.connectInput(from);

        this.from.links.push(this);
        this.to.links.push(this);
    }

    public disconnect() {
        this.to.disconnectInput(this.from);
    }
}