<script lang="ts">
import NodeMap from "$lib/components/NodeMap.svelte";
import { POINTS_STORE } from "$lib/points";
import {
	SELL_NODE,
	createArithmeticNodeType,
	createNumberNodeType,
	createPlacedNode,
} from "$lib/types";
import Shop from "$lib/components/Shop.svelte";

const nodes = [
	createPlacedNode(createNumberNodeType(1), { x: 100, y: 100 }),
	createPlacedNode(
		createArithmeticNodeType("Add", "+", (op1, op2) => op1 + op2),
		{ x: 300, y: 100 },
	),
	createPlacedNode(SELL_NODE, { x: 500, y: 100 }),
];
</script>

<div>
    <NodeMap {nodes}/>
    <Shop/>
    <span>Points: {$POINTS_STORE}</span>
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