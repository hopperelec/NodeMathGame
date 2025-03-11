<script lang="ts">
import GenericNode from "$lib/components/GenericNode.svelte";
import type { NodeType } from "$lib/types";

let { nodeType }: { nodeType: NodeType } = $props();
</script>

<GenericNode {nodeType}>
    {#snippet inputAnchor()}
        <div id="input-anchor" ></div>
    {/snippet}
    {#snippet outputAnchor()}
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