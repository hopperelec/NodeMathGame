<script lang="ts">
import GenericNode from "$lib/components/GenericNode.svelte";
import type { PlacedNode } from "$lib/types";
import { Anchor, Node } from "svelvet";

export let node: PlacedNode;
</script>

<Node id={node.id} position={node.position} editable={false} let:selected>
    <GenericNode node_type={node.type} {selected}>
        <div id="input-anchor" slot="input_anchor" let:i>
            <!-- Edge label isn't reactive, not sure why -->
            <Anchor input id={"I"+i} edgeLabel={node.inputs[+i]?.toString()}>
                <div></div>
            </Anchor>
        </div>
        <div id="output-anchor" slot="output_anchor" let:i>
            <Anchor output id={"O"+i} multiple={false}>
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