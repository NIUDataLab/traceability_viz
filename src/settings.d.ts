/**
 * Sigma.js Settings
 * =================================
 *
 * The list of settings and some handy functions.
 * @module
 */
import { Attributes, NodeKey, EdgeKey } from "graphology-types";
import drawLabel from "./rendering/canvas/label";
import drawHover from "./rendering/canvas/hover";
import drawEdgeLabel from "./rendering/canvas/edge-label";
import { EdgeDisplayData, NodeDisplayData } from "./types";
import { EdgeProgramConstructor } from "./rendering/webgl/programs/common/edge";
import { NodeProgramConstructor } from "./rendering/webgl/programs/common/node";
export declare function validateSettings(settings: Settings): void;
/**
 * Sigma.js settings
 * =================================
 */
export interface Settings {
    hideEdgesOnMove: boolean;
    hideLabelsOnMove: boolean;
    renderLabels: boolean;
    renderEdgeLabels: boolean;
    enableEdgeClickEvents: boolean;
    enableEdgeWheelEvents: boolean;
    enableEdgeHoverEvents: boolean | "debounce";
    labelColor: {
        attribute: string;
        color?: string;
    } | {
        color: string;
        attribute?: undefined;
    };
    edgeLabelColor: {
        attribute: string;
        color?: string;
    } | {
        color: string;
        attribute?: undefined;
    };
    zoomToSizeRatioFunction: (ratio: number) => number;
    itemSizesReference: "screen" | "positions";
    minCameraRatio: null | number;
    defaultNodeColor: string;
    defaultNodeType: string;
    defaultEdgeColor: string;
    defaultEdgeType: string;
    labelFont: string;
    labelSize: number;
    labelWeight: string;
    edgeLabelFont: string;
    edgeLabelSize: number;
    edgeLabelWeight: string;
    stagePadding: number;
    labelDensity: number;
    labelGridCellSize: number;
    labelRenderedSizeThreshold: number;
    nodeReducer: null | ((node: NodeKey, data: Attributes) => Partial<NodeDisplayData>);
    edgeReducer: null | ((edge: EdgeKey, data: Attributes) => Partial<EdgeDisplayData>);
    zIndex: boolean;
    labelRenderer: typeof drawLabel;
    hoverRenderer: typeof drawHover;
    maxCameraRatio: null | number;
    allowInvalidContainer: boolean;
    edgeLabelRenderer: typeof drawEdgeLabel;
    nodeProgramClasses: {
        [key: string]: NodeProgramConstructor;
    };
    edgeProgramClasses: {
        [key: string]: EdgeProgramConstructor;
    };
    nodeHoverProgramClasses: {
        [type: string]: NodeProgramConstructor;
    };
}
export declare const DEFAULT_SETTINGS: Settings;