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

    private _links: ILink[];

    public constructor(node: INode, index: number) {
        this._index = index;
        this._node = node;
        this._links = []
    }

    public get index(): number {
        return this._index;
    }

    public get node(): INode {
        return this._node;
    }

    public get links(): ILink[] {
        return this._links;
    }
}