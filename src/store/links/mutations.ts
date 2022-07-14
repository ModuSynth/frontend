import INode from "@/interfaces/INode";
import IPort from "@/interfaces/IPort";
import { MutationTree } from "vuex";
import { LinkMutationTypes } from "./enums";
import { ILinkState, LinkMutations } from "./interfaces";

class ElementNotFound extends Error {}

function findNode(nodes: INode[], nodeId: string): INode {
  const node: INode | undefined = nodes.find(n => n.id == nodeId)
  if (node === undefined) throw new ElementNotFound();
  return node;
}

function findPort(ports: IPort[], index: number): IPort {
  const port: IPort | undefined = ports.find(p => p.index === index);
  if (port === undefined) throw new ElementNotFound();
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
        to: findPort(to.outputs, link.to.index)
      });
      from.waaNode.connect(to.waaNode, link.from.index, link.to.index)
    }
    catch(ElementNotFound) {
      console.log("Something that was required to find the link was not found.");
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