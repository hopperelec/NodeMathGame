<script lang="ts">
import NodeMap from "$lib/components/NodeMap.svelte";
import { POINTS_STORE } from "$lib/points";
import {
    SELL_NODE,
    createArithmeticNodeType,
    createNumberNodeType,
    createPlacedNode, type PlacedNode,
} from "$lib/types";
import Shop from "$lib/components/Shop.svelte";
import SelectedShopNode from "$lib/components/SelectedShopNode.svelte";
import SELECTED_SHOP_NODE from "$lib/selected-shop-node";

let nodes: PlacedNode[] = $state([
	createPlacedNode(createNumberNodeType(1), { x: 100, y: 100 }),
    createPlacedNode(createNumberNodeType(1), { x: 100, y: 200 }),
	createPlacedNode(
		createArithmeticNodeType("Add", "+", (op1, op2) => op1 + op2),
		{ x: 300, y: 130 },
	),
	createPlacedNode(SELL_NODE, { x: 500, y: 130 }),
]);

let nodeMapContainer: HTMLElement | undefined = $state();
</script>

<div>
    <div bind:this={nodeMapContainer}>
        <NodeMap bind:nodes/>
    </div>
    <Shop/>
    <span>Points: {$POINTS_STORE}</span>
    <SelectedShopNode onPlace={() => {
        if ($SELECTED_SHOP_NODE === null) throw new Error("No selected node to place");
        nodes.push(createPlacedNode($SELECTED_SHOP_NODE.nodeType, $SELECTED_SHOP_NODE.position));
        nodes = nodes; // trigger reactivity
    }} {nodeMapContainer}/>
</div>

<style>
div {
    display: flex;
    flex-direction: column;
    height: 100%;
    font-family: 'Roboto', sans-serif;
}

span {
    position: absolute;
    top: 0;
    color: white;
    font-size: 1.5em;
    padding: .3em;
}
</style>