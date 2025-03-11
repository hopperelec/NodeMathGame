<script lang="ts">
import UnplacedNode from "$lib/components/UnplacedNode.svelte";
import type {NodeType} from "$lib/types";
import SELECTED_SHOP_NODE from "$lib/selected-shop-node";
import {POINTS_STORE} from "$lib/points";

let { node_type, cost, stored = $bindable(0) }: {
    node_type: NodeType;
    cost: number;
    stored?: number;
} = $props();
let usable = $derived(cost < $POINTS_STORE || stored > 0);

function onMousedown(event: MouseEvent) {
    if (!usable) return;
    SELECTED_SHOP_NODE.set({
        node_type,
        buy() {
            if (stored > 0) {
                stored--;
                return true;
            }
            if (cost > $POINTS_STORE) return false;
            $POINTS_STORE -= cost;
            return true;
        },
        position: { x: event.clientX, y: event.clientY }
    });
}
</script>

<button type="button" class:usable onmousedown={onMousedown}>
    <UnplacedNode {node_type}/>
    <span>Cost: {cost}</span>
    <span>Stored: {stored}</span>
</button>

<style>
button {
    display: flex;
    flex-direction: column;
    background-color: #333;
    border: none;
    color: white;
    padding: .5em;
    margin: .5em;
    border-radius: .5em;
    cursor: not-allowed;
}

.usable {
    cursor: pointer;
    user-select: none;
}
</style>