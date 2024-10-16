<script lang="ts">
import UnplacedNode from "$lib/components/UnplacedNode.svelte";
import type {NodeType} from "$lib/types";

export let node_type: NodeType;
export let cost: number;
export let stored = 0;
</script>

<div>
    <UnplacedNode {node_type}/>
    <span>Cost: {cost}</span>
    <span>Stored: {stored}</span>
</div>

<style>
div {
    display: flex;
    flex-direction: column;
    background-color: #333;
    color: white;
    padding: .5em;
    margin: .5em;
    border-radius: .5em;
    cursor: pointer;
    user-select: none;
}
</style>