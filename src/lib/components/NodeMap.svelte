<script lang="ts">
import PlacedNodeComponent from "$lib/components/PlacedNode.svelte";
import type { PlacedNode, ValidOutputValue } from "$lib/types";
import { Svelvet } from "svelvet";
import CustomEdge from "$lib/components/CustomEdge.svelte";

let { nodes = $bindable([]) }: { nodes?: PlacedNode[] } = $props();

function parseAnchorId(anchorId: { id: string }): number {
	return +anchorId.id.split("/", 1)[0].substring(3);
}

function parseNode(nodeId: { id: string }): PlacedNode {
	const parsedNodeId = +nodeId.id.substring(2);
	const node = nodes.find((n) => n.id === parsedNodeId);
	if (node === undefined) throw new Error("Node not found");
	return node;
}

function parseNodeEvent(event: CustomEvent) {
	return {
		source: {
			node: parseNode(event.detail.sourceNode),
			outputId: parseAnchorId(event.detail.sourceAnchor),
		},
		target: {
			node: parseNode(event.detail.targetNode),
			inputId: parseAnchorId(event.detail.targetAnchor),
		},
	};
}

function setInputValue(
	node: PlacedNode,
	inputId: number,
	value: ValidOutputValue,
) {
	node.inputs[inputId] = value;
	const output = node.inputs.every((input) => input !== null)
		? node.type.processor(node.inputs)
		: null;
    for (const [i, outputAnchor] of node.outputs.entries()) {
        if (outputAnchor !== null) {
            setInputValue(outputAnchor.node, outputAnchor.inputId, output ? output[i] : null);
        }
    }
}

function onConnection(event: CustomEvent) {
	const { source, target } = parseNodeEvent(event);
    source.node.outputs[source.outputId] = target;
	if (source.node.inputs.every((input) => input !== null)) {
		setInputValue(
			target.node,
			target.inputId,
			source.node.type.processor(source.node.inputs)[source.outputId],
		);
	}
}

function onDisconnection(event: CustomEvent) {
	const { source, target } = parseNodeEvent(event);
	source.node.outputs[source.outputId] = null;
	setInputValue(target.node, target.inputId, null);
}

setInterval(() => {
	for (const node of nodes) {
		if (
			node.type.outputNames.length === 0 &&
			node.inputs.every((input) => input !== null)
		) {
			node.type.processor(node.inputs);
		}
	}
}, 1000);
</script>

<!-- Sadly, Svelvet doesn't seem to fully support Svelte 5 yet, so there is not a way to clear the following error -->
<Svelvet minimap controls pannable theme="dark" edge={CustomEdge} edgesAboveNode on:connection={onConnection} on:disconnection={onDisconnection}>
    {#each Object.keys(nodes) as nodeIndex}
        <PlacedNodeComponent bind:node={nodes[+nodeIndex]}/>
    {/each}
</Svelvet>