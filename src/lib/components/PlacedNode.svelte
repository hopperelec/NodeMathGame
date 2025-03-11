<script lang="ts">
import GenericNode from "$lib/components/GenericNode.svelte";
import type { PlacedNode } from "$lib/types";
import { Anchor, Node } from "svelvet";

let { node = $bindable() }: { node: PlacedNode } = $props();
</script>

<Node id={node.id} bind:position={node.position} editable={false}>
    <!-- I'm not sure why the type of selected isn't being inferred,
    and I don't think there is a way to ignore the type error -->
    {#snippet children({ selected })}
        <GenericNode nodeType={node.type} {selected}>
            {#snippet inputAnchor({ i })}
                <div id="input-anchor"  >
                    <!-- Edge label isn't reactive, see https://github.com/open-source-labs/Svelvet/issues/522 -->
                    <Anchor input id={"I"+i} edgeLabel={node.inputs[+i]?.toString()}>
                        <div></div>
                    </Anchor>
                </div>
            {/snippet}
            {#snippet outputAnchor({ i })}
                <div id="output-anchor"  >
                    <Anchor output id={"O"+i} multiple={false}>
                        <div></div>
                    </Anchor>
                </div>
            {/snippet}
        </GenericNode>
    {/snippet}
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