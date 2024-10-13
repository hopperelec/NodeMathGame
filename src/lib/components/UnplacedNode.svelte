<script lang="ts">
import GenericNode from "$lib/components/GenericNode.svelte";
import type {NodeType} from "$lib/types";

export let node_type: NodeType<number, number>;
</script>

<GenericNode {node_type}>
    <div id="input-anchor" slot="input_anchor"></div>
    <div id="output-anchor" slot="output_anchor"></div>
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