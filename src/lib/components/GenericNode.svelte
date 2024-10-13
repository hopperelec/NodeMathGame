<script lang="ts">
import { CATEGORY_COLORS, type NodeType } from "$lib/types";

export let node_type: NodeType<number, number>;
export let selected = false;
</script>

<div id="node_container" class:selected style:--color={CATEGORY_COLORS[node_type.category]}>
    <h2>{node_type.name}</h2>
    <div id="io">
        {#if node_type.input_names}
            <ol id="inputs">
                {#each node_type.input_names as input_name}
                    <li>
                        <slot name="input_anchor"/>
                        <span>{input_name}</span>
                    </li>
                {/each}
            </ol>
        {/if}
        {#if node_type.output_names}
            <ol id="outputs">
                {#each node_type.output_names as output_name}
                    <li>
                        <slot name="output_anchor"/>
                        <span>{output_name}</span>
                    </li>
                {/each}
            </ol>
        {/if}
    </div>
</div>

<style>
#node_container {
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