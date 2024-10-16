<script lang="ts">
import PlacedNodeComponent from "$lib/components/PlacedNode.svelte";
import type { PlacedNode } from "$lib/types";
import { Svelvet } from "svelvet";

export let nodes: PlacedNode[] = [];

function parseAnchorId(anchorId: { id: string }): number {
	return +anchorId.id.split("/", 1)[0].substring(2);
}

function isTerminus(node: PlacedNode): boolean {
    return node.outputs.length === 0;
}

function onConnection(event: CustomEvent) {
	const sourceNode = nodes[event.detail.sourceNode.id.substring(2)];
	const sourceOutputId = parseAnchorId(event.detail.sourceAnchor);
	const targetNode = nodes[event.detail.targetNode.id.substring(2)];
	const targetInputId = parseAnchorId(event.detail.targetAnchor);
	targetNode.inputs[targetInputId] = sourceNode.outputs[sourceOutputId];
	if (targetNode.inputs.every((input) => input !== null) && !isTerminus(targetNode)) {
		targetNode.outputs = targetNode.type.processor(targetNode.inputs);
	}
}

function onDisconnection(event: CustomEvent) {
	const targetNode = nodes[event.detail.targetNode.id.substring(2)];
	const targetInputId = parseAnchorId(event.detail.targetAnchor);
	targetNode.inputs[targetInputId] = null;
	targetNode.outputs = targetNode.outputs.map(() => null);
}

setInterval(() => {
    for (const node of nodes) {
        if (node.inputs.every((input) => input !== null) && isTerminus(node))
            node.type.processor(node.inputs);
    }
}, 1000);
</script>

<Svelvet minimap controls pannable theme="dark" edgesAboveNode on:connection={onConnection} on:disconnection={onDisconnection}>
    {#each Object.entries(nodes) as [i, node]}
        <PlacedNodeComponent id={i} node_type={node.type} position={node.position}/>
    {/each}
</Svelvet>