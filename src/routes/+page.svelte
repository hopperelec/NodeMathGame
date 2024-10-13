<script>
import Node from "$lib/components/Node.svelte";
import { createArithmeticNodeType } from "$lib/types";
</script>

<div>
    <Node node_type={createArithmeticNodeType("Addition", "+", (op1, op2) => op1+op2)} />
</div>

<style>
div {
    font-family: sans-serif;
}
</style>