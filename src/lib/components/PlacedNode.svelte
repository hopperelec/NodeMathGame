<script lang="ts">
import type {NodeType} from "$lib/types";
import {Anchor, generateInput, generateOutput, Node} from "svelvet";
import GenericNode from "$lib/components/GenericNode.svelte";

export let node_type: NodeType<number, number>;

// The following 3 lines are completely untested!
const inputsStore = generateInput({} as Record<string, { result: null | number }>);
const outputStore = generateOutput(inputsStore, (inputs) => {
    if (Object.values(inputs).some((input) => input.result === null)) return [];
    return node_type.processor(Object.values(inputs).map((input) => {
        if (input.result === null) throw new Error("This should never happen");
        return input.result;
    }));
});
export let position: {x: number, y: number};
</script>

<Node editable={false} let:selected {position}>
    <GenericNode {node_type} {selected}>
        <div id="input-anchor" slot="input_anchor">
            <Anchor input {inputsStore}>
                <div></div>
            </Anchor>
        </div>
        <div id="output-anchor" slot="output_anchor">
            <Anchor output {outputStore}>
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