<script lang="ts">
import { CATEGORY_COLORS, type NodeType } from "$lib/types";
import type {Snippet} from "svelte";

let {
    node_type,
    selected = false,
    input_anchor,
    output_anchor
}: {
    node_type: NodeType;
    selected?: boolean;
    input_anchor: Snippet<[{ i: number }]>;
    output_anchor: Snippet<[{ i: number }]>;
} = $props();
</script>

<div id="node-container" class:selected style:--color={CATEGORY_COLORS[node_type.category]}>
    <h2>{node_type.name}</h2>
    <div id="io">
        {#if node_type.input_names}
            <ol id="inputs">
                {#each Object.entries(node_type.input_names) as [i,input_name]}
                    <li>
                        {@render input_anchor({ i: +i })}
                        {#if input_name}<span>{input_name}</span>{/if}
                    </li>
                {/each}
            </ol>
        {/if}
        {#if node_type.output_names}
            <ol id="outputs">
                {#each Object.entries(node_type.output_names) as [i,output_name]}
                    <li>
                        {@render output_anchor({ i: +i })}
                        {#if output_name}<span>{output_name}</span>{/if}
                    </li>
                {/each}
            </ol>
        {/if}
    </div>
</div>

<style>
#node-container {
    display: inline-block;
    position: relative;
    border: 2px solid var(--color);
    color: white;
    background-color: black;

    &.selected {
        outline: 1px dashed cyan;
    }
}

h2 {
    width: 100%;
    box-sizing: border-box;
    text-align: center;
    font-size: 1.3em;
    font-weight: normal;
    border-bottom: 1px dashed var(--color);
    padding: .2em .5em;
    margin-bottom: .5em;
}

ol {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

li {
    height: 1.5em;
}

#io {
    display: flex;
    margin: 0 .8em;
}

#inputs, #outputs {
    width: 100%;
}

#inputs {
    padding-right: .5em;
}

#outputs {
    padding-left: .5em;
    text-align: right;
}
</style>