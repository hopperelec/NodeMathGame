import {type Writable, writable} from "svelte/store";
import type {NodeType} from "$lib/types";

const SELECTED_SHOP_NODE: Writable<{
    node_type: NodeType,
    buy: () => boolean,
    position: { x: number, y: number }
} | null> = writable(null);
export default SELECTED_SHOP_NODE;