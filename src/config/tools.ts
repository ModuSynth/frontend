import { NodeType } from "@/interfaces/enums/NodeType"

export interface IParamDefault {
    name: string;
    value: any;
}

export interface ITool {
    params: IParamDefault[];
    dimensions: {width: number, height: number};
}

type Tools = {[key in NodeType]: ITool}

export const tools: Tools = {
    "OscillatorNode": {
        "params": [
            {
                "name": "frequency",
                "value": 440
            },
            {
                "name": "detune",
                "value": 0
            },
            {
                "name": "type",
                "value": "sine"
            },
        ],
        "dimensions": {"width": 150, "height": 150}
    },
    "GainNode": {
        "params": [
            {
                "name": "gain",
                "value": 0.1
            }
        ],
        "dimensions": {"width": 150, "height": 150}
    },
    "OutputNode": {
        "params": [],
        "dimensions": {"width": 150, "height": 150}
    },
    "ChannelMergerNode": {
        "params": [],
        "dimensions": {"width": 150, "height": 150}
    }
}