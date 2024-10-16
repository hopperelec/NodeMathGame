<script lang="ts">
import NodeMap from "$lib/components/NodeMap.svelte";
import { POINTS_STORE } from "$lib/points";
import {
	SELL_NODE,
	createArithmeticNodeType,
	createNumberNodeType,
	createPlacedNode,
} from "$lib/types";

const nodes = [
	createPlacedNode(createNumberNodeType(1), { x: 100, y: 100 }),
	createPlacedNode(
		createArithmeticNodeType("Add", "+", (op1, op2) => op1 + op2),
		{ x: 300, y: 100 },
	),
	createPlacedNode(SELL_NODE, { x: 500, y: 100 }),
];
</script>

<NodeMap {nodes}/>
<span>Points: {$POINTS_STORE}</span>

<style>
span {
    position: absolute;
    top: 0;
    color: white;
    font-size: 1.5em;
    padding: .3em;
}
</style>