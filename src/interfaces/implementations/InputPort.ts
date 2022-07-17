import store from "@/store";
import ILink from "../ILink";
import INode from "../INode";
import IPort from "../IPort";

/**
 * This class represents the input port of a node. This is NOT the
 * representation of an input port for a parameter.
 * @author Vincent Courtois <courtois.vincent@outlook.com>
 */
export default class Port implements IPort {

    // Read-only property used to get the index of the node in the corresponding nodes list. Indexes start at 0.
    private _index: number;
    // Read-only property used to get the node in which the port is declared.
    private _node: INode;

    public constructor(node: INode, index: number) {
        this._index = index;
        this._node = node;
    }

    public get index(): number {
        return this._index;
    }

    public get node(): INode {
        return this._node;
    }
}

export class InputPort extends Port {
    /**
     * Returns the links, declared in the state, that this port is currently connected to.
     * @return the list of links that lead to this input port.
     */
    public get links(): ILink[] {
        return (store as any).state.links.links.filter((l: ILink) => {
            return l.to.node.id === this.node.id
        })
    }
}

export class OutputPort extends Port {
    /**
     * Returns the links, declared in the state, that this port is currently connected to.
     * @return the list of links that goes from this output port.
     */
    public get links(): ILink[] {
        return (store as any).state.links.links.filter((l: ILink) => {
            return l.from.node.id === this.node.id
        })
    }
}