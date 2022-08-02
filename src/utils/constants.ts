// This value is kind of magic. It has been determined after trials and
// errors as the best value to apply to the wheel scroll to zoom in and
// out smoothly without it being too fast or too slow.
export const ZOOM_RATIO = 0.005;

// This value is the maximum value the ratio can be "zoomed out" with
// It is a magic value obtained after some trials and errors too.
export const MAX_ZOOM_OUT = 0.0625;

// This value is the maximum value the ratio can be "zoomed in" with
// It is a magic value obtained after some trials and errors too.
export const MAX_ZOOM_IN = 2;

/* +----------------------------------------------------+
 * | CONSTANTS CONCERNING NODES/PARAMS/PORTS DIMENSIONS |
 * +----------------------------------------------------+ */

export const PARAM_HEIGHT = 30;
export const PARAM_WIDTH  = 140;
export const PARAM_TOP_MARGIN = 10;

export const NODE_PADDING = 10;
export const NODE_CLOSE_SIZE = 16;
export const NODE_TITLE_HEIGHT = 16;
export const NODE_HEADERS_MARGIN = 5;
export const NODE_TITLE_WIDTH = PARAM_WIDTH - NODE_CLOSE_SIZE;

export const PORT_RADIUS = 10;
export const PORT_TOP_MARGIN = 5;
export const FULL_PORT_DIAMETER = 2 * PORT_RADIUS + PORT_TOP_MARGIN

export let AUDIO_CONTEXT: AudioContext;

export const API_URL = process.env.VUE_APP_API_URL || 'http://localhost:3000'

export async function resetContext() {
    return new Promise((resolve: any) => {
        AUDIO_CONTEXT = new AudioContext();
        resolve();
    });
}

export const SLOT_COUNT = 20;
export const RACK_HEIGHT = 400;
export const SLOT_SIZE = RACK_HEIGHT / 10;