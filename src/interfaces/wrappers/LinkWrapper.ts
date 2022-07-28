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
    }
}