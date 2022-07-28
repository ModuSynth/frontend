import NodeWrapper from "@/interfaces/wrappers/NodeWrapper";
import { GetterTree } from "vuex";
import MainState from "../utils/MainState";
import { NodeGetterTypes } from "./enums";
import { INodeState, NodeGetters } from "./interfaces";

const getters: GetterTree<INodeState, MainState> & NodeGetters = {
    [NodeGetterTypes.NODES](state) {
        return state.nodes.map((n: NodeWrapper) => n.ports).flat();
    }
}