<script>
import {Svelvet} from 'svelvet';
import {createArithmeticNodeType} from "$lib/types";
import PlacedNode from "$lib/components/PlacedNode.svelte";
</script>

<Svelvet minimap controls pannable theme="dark" edgesAboveNode>
    <PlacedNode node_type={createArithmeticNodeType("Add", "+", (op1, op2) => op1+op2)} />
    <PlacedNode node_type={createArithmeticNodeType("Subtract", "-", (op1, op2) => op1-op2)} />
</Svelvet>
