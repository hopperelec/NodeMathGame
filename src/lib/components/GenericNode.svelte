<script lang="ts">
import { CATEGORY_COLORS, type NodeType } from "$lib/types";
import type {Snippet} from "svelte";

let {
    nodeType,
    selected = false,
    inputAnchor,
    outputAnchor
}: {
    nodeType: NodeType;
    selected?: boolean;
    inputAnchor: Snippet<[{ i: number }]>;
    outputAnchor: Snippet<[{ i: number }]>;
} = $props();
</script>

<div id="node-container" class:selected style:--color={CATEGORY_COLORS[nodeType.category]}>
    <h2>{nodeType.name}</h2>
    <div id="io">
        {#if nodeType.inputNames}
            <ol id="inputs">
                {#each Object.entries(nodeType.inputNames) as [i,inputName]}
                    <li>
                        {@render inputAnchor({ i: +i })}
                        {#if inputName}<span>{inputName}</span>{/if}
                    </li>
                {/each}
            </ol>
        {/if}
        {#if nodeType.outputNames}
            <ol id="outputs">
                {#each Object.entries(nodeType.outputNames) as [i,outputName]}
                    <li>
                        {@render outputAnchor({ i: +i })}
                        {#if outputName}<span>{outputName}</span>{/if}
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