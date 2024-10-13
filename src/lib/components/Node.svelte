<script lang="ts">
import { CATEGORY_COLORS, type NodeType } from "$lib/types";

export let node_type: NodeType<number, number>;
</script>

<div id="node_container" style:--color={CATEGORY_COLORS[node_type.category]}>
    <h2>{node_type.name}</h2>
    <div id="io">
        {#if node_type.input_names}
            <ol id="inputs">
                {#each node_type.input_names as input_name}
                    <li>{input_name}</li>
                {/each}
            </ol>
        {/if}
        {#if node_type.output_names}
            <ol id="outputs">
                {#each node_type.output_names as output_name}
                    <li>{output_name}</li>
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
    margin: 1em;
    color: white;
    background-color: black;
}

h2 {
    width: 100%;
    box-sizing: border-box;
    text-align: center;
    font-size: 1.3em;
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

    & ::before {
        left: -9px;
    }
}

#outputs {
    padding-left: .5em;
    text-align: right;

    & ::after {
        right: -9px;
    }
}

#inputs ::before, #outputs ::after {
    content: "";
    width: calc(1em - 2px);
    height: calc(1em - 2px);
    position: absolute;
    background-color: black;
    border: 2px solid var(--color);
    border-radius: 50%;
}
</style>