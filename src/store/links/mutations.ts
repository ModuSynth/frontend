import INode from "@/interfaces/INode";
import IPort from "@/interfaces/IPort";
import { MutationTree } from "vuex";
import { LinkMutationTypes } from "./enums";
import { ILinkState, LinkMutations } from "./interfaces";

class ElementNotFound extends Error {

  private _type: string;

  constructor(type: string) {
    super();
    this._type = type;
  }

  public get type() {
    return this._type;
  }
}

function findNode(nodes: INode[], nodeId: string): INode {
  const node: INode | undefined = nodes.find(n => n.id == nodeId)
  if (node === undefined) throw new ElementNotFound("node");
  return node;
}

function findPort(ports: IPort[], index: number): IPort {
  const port: IPort | undefined = ports.find(p => p.index === index);
  if (port === undefined) {
    console.log(ports, index)
  }
  if (port === undefined) throw new ElementNotFound("port");
  return port;
}

const mutations: MutationTree<ILinkState> & LinkMutations = {
  [LinkMutationTypes.ADD_LINK](state, link) {
    try {
      const nodes: INode[] = (this.state as any).nodes.nodes;
      const from: INode = findNode(nodes, link.from.id);
      const to: INode = findNode(nodes, link.to.id);
      state.links.push({
        id: link.id,
        from: findPort(from.outputs, link.from.index),
        to: findPort(to.inputs, link.to.index)
      });
      from.waaNode.connect(to.waaNode, link.from.index, link.to.index)
    }
    catch(_e) {
      const e: ElementNotFound = _e as ElementNotFound;
      console.log(e);
    }
  },
  [LinkMutationTypes.ADD_PARAM_LINK](state, link) {
    const nodes: INode[] = (this.state as any).nodes.nodes;
    const from: INode | undefined = nodes.find(n => n.id == link.from.id);
    const split: string[] = link.to.id.split('::');
    const to: INode | undefined = nodes.find(n => n.id == split[0]);
    if (from !== undefined && to !== undefined) {
      state.paramLinks.push({
        id: link.id,
        from: { node: from, index: link.from.index },
        to: { node: to, index: link.to.index },
        paramName: split[1]
      });
      from.waaNode.connect((to.waaNode as any)[split[1]])
    }
  }
}

export default mutations;