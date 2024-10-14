<script lang="ts">
import GenericNode from "$lib/components/GenericNode.svelte";
import type { NodeType } from "$lib/types";
import { Anchor, Node } from "svelvet";

export let node_type: NodeType;
export let position: { x: number; y: number };
export let id: string;
</script>

<Node {id} editable={false} let:selected {position}>
    <GenericNode {node_type} {selected}>
        <div id="input-anchor" slot="input_anchor" let:i>
            <Anchor input id={i}>
                <div></div>
            </Anchor>
        </div>
        <div id="output-anchor" slot="output_anchor" let:i>
            <Anchor output id={i}>
                <div></div>
            </Anchor>
        </div>
    </GenericNode>
</Node>

<style>
#input-anchor {
    left: -9px;
}

#output-anchor {
    right: -9px;
}

#input-anchor, #output-anchor {
    position: absolute;

    & div {
        width: calc(1em - 2px);
        height: calc(1em - 2px);
        background-color: black;
        border: 2px solid var(--color);
        border-radius: 50%;
    }
}
</style>