<script lang="ts">
import PlacedNodeComponent from "$lib/components/PlacedNode.svelte";
import type { PlacedNode } from "$lib/types";
import { Svelvet } from "svelvet";

export let nodes: PlacedNode[] = [];

function parseAnchorId(anchorId: { id: string }): number {
	return +anchorId.id.split("/", 1)[0].substring(2);
}

function onConnection(event: CustomEvent) {
	const sourceNode = nodes[event.detail.sourceNode.id.substring(2)];
	const sourceOutputId = parseAnchorId(event.detail.sourceAnchor);
	const targetNode = nodes[event.detail.targetNode.id.substring(2)];
	const targetInputId = parseAnchorId(event.detail.targetAnchor);
	targetNode.inputs[targetInputId] = sourceNode.outputs[sourceOutputId];
	if (targetNode.inputs.every((input) => input !== null)) {
		targetNode.outputs = targetNode.type.processor(targetNode.inputs);
	}
}

function onDisonnection(event: CustomEvent) {
	const targetNode = nodes[event.detail.targetNode.id.substring(2)];
	const targetInputId = parseAnchorId(event.detail.targetAnchor);
	targetNode.inputs[targetInputId] = null;
	targetNode.outputs = targetNode.outputs.map(() => null);
}
</script>

<Svelvet minimap controls pannable theme="dark" edgesAboveNode on:connection={onConnection} on:disconnection={onDisonnection}>
    {#each Object.entries(nodes) as [i, node]}
        <PlacedNodeComponent id={i} node_type={node.type} position={node.position}/>
    {/each}
</Svelvet>