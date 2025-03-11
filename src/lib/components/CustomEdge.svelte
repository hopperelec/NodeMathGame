<script lang="ts">
import {Edge} from "svelvet";

let destroy: (() => void) | undefined = $state();
</script>

<Edge bind:destroy edgeClick={destroy} targetColor="#990" animate={!window.matchMedia("(prefers-reduced-motion: reduce)").matches}/>
