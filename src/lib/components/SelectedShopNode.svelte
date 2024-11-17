<script lang="ts">
import SELECTED_SHOP_NODE from "$lib/selected-shop-node";
import UnplacedNode from "$lib/components/UnplacedNode.svelte";
import {createEventDispatcher} from "svelte";

const eventDispatcher = createEventDispatcher();
export let nodeMapContainer: HTMLElement;

// If the user drags too quickly, the mouse events won't be triggered.
// One potential fix would be to have a global mousemove listener, but I'm hoping for a cleaner solution.
</script>

{#if $SELECTED_SHOP_NODE}
    <div role="button" tabindex="0" style:left={`${$SELECTED_SHOP_NODE.position.x}px`} style:top={`${$SELECTED_SHOP_NODE.position.y}px`}
         on:mousemove={event => {
             // TODO: Make this relative to the map
             $SELECTED_SHOP_NODE.position.x = event.clientX;
             $SELECTED_SHOP_NODE.position.y = event.clientY;
         }}
         on:mouseup={event => {
            const rect = nodeMapContainer.getBoundingClientRect();
            if (
                event.clientX >= rect.left && event.clientX <= rect.right &&
                event.clientY >= rect.top && event.clientY <= rect.bottom &&
                $SELECTED_SHOP_NODE.buy()
            ) {
                eventDispatcher("place");
            }
            SELECTED_SHOP_NODE.set(null);
         }}
    >
        <UnplacedNode node_type={$SELECTED_SHOP_NODE.node_type}/>
    </div>
{/if}

<style>
div {
    position: fixed;
    transform: translate(-50%, -50%);
}
</style>