<script>
import ShopNode from "$lib/components/ShopNode.svelte";
import {createArithmeticNodeType, createNumberNodeType, SELL_NODE} from "$lib/types";
</script>

<div>
    <h2>Shop</h2>
    <ul>
        <li><ShopNode node_type={SELL_NODE} cost={20} stored={1}/></li>
        <li><ShopNode node_type={createNumberNodeType(1)} cost={10} stored={1}/></li>
        <li><ShopNode node_type={createArithmeticNodeType("Add", "+", (op1, op2) => op1+op2)} cost={20}/></li>
    </ul>
</div>

<style>
div {
    background-color: #555;
    color: white;
}

h2 {
    padding: .3em 0 0 .3em;
}

ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0;
}

li {
    list-style-type: none;
}
</style>