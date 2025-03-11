<script lang="ts">
import GenericNode from "$lib/components/GenericNode.svelte";
import type { NodeType } from "$lib/types";

let { node_type }: { node_type: NodeType } = $props();
</script>

<GenericNode {node_type}>
    {#snippet input_anchor()}
        <div id="input-anchor" ></div>
    {/snippet}
    {#snippet output_anchor()}
        <div id="output-anchor" ></div>
    {/snippet}
</GenericNode>

<style>
#input-anchor {
    left: -9px;
}

#output-anchor {
    right: -9px;
}

#input-anchor, #output-anchor {
    position: absolute;
    width: calc(1em - 2px);
    height: calc(1em - 2px);
    background-color: black;
    border: 2px solid var(--color);
    border-radius: 50%;
}
</style>