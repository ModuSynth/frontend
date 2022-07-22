import ILink, { IParamLink } from "@/interfaces/ILink";
import INode from "@/interfaces/INode";
import IPort from "@/interfaces/IPort";
import { MutationTree } from "vuex";
import { LinkMutationTypes } from "./enums";
import { ILinkState, LinkMutations } from "./interfaces";
import Node from '@/interfaces/implementations/Node'
import { cloneDeep, find, findIndex, remove } from "lodash";

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

function findNode(nodes: Node[], nodeId: string): Node {
  const node: Node | undefined = nodes.find(n => n.id == nodeId)
  if (node === undefined) throw new ElementNotFound("node");
  return node;
}

function findPort(ports: IPort[], index: number): IPort {
  const port: IPort | undefined = ports.find(p => p.index === index);
  if (port === undefined) throw new ElementNotFound("port");
  return port;
}

const mutations: MutationTree<ILinkState> & LinkMutations = {
  [LinkMutationTypes.ADD_LINK](state, link) {
    try {
      const nodes: Node[] = (this.state as any).nodes.nodes;
      const from: Node = findNode(nodes, link.from.id);
      const to: Node = findNode(nodes, link.to.id);
      state.links.push(from.connect(to, link.id));
    }
    catch(_e) {
      const e: ElementNotFound = _e as ElementNotFound;
      console.log(e);
    }
  },
  [LinkMutationTypes.ADD_PARAM_LINK](state, link) {
    try {
      const nodes: Node[] = (this.state as any).nodes.nodes;
      const split: string[] = link.to.id.split('::');
      const from: INode = findNode(nodes, link.from.id);
      const to: INode = findNode(nodes, split[0]);
      state.paramLinks.push({
        id: link.id,
        from: findPort(from.outputs, link.from.index),
        to: findPort(to.inputs, link.to.index),
        paramName: split[1]
      });
      from.waaNode.connect((to.waaNode as any)[split[1]])
    }
    catch(_e) {
      const e: ElementNotFound = _e as ElementNotFound;
    }
  },
  [LinkMutationTypes.REMOVE_LINK](state, id) {
    const index: number = state.links.findIndex(l => l.id === id);
    if (index > -1) {
      const found: ILink = state.links[index];
      found.from.node.waaNode.disconnect(found.to.node.waaNode);
      state.links.splice(index, 1);
    }
  },
  [LinkMutationTypes.REMOVE_PARAM_LINK](state, link) {
    const param: AudioParam = link.to.node.waaNode[link.paramName as unknown as keyof AudioNode] as unknown as AudioParam;
    link.from.node.waaNode.disconnect(param);
    state.paramLinks.splice(findIndex(state.paramLinks, {id: link.id}), 1);
  }
}

export default mutations;