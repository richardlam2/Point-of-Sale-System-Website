<script>
	import { ShoppingCart } from "lucide-svelte";
	import { createEventDispatcher } from "svelte";
	import { getToastStore } from "@skeletonlabs/skeleton";

	export let rowData;
	const dispatch = createEventDispatcher();

	async function onClick(e) {
		dispatch('clicked', e);
	}
</script>

<button type="button" class="btn-icon variant-filled" on:click={onClick}>
	<ShoppingCart />
</button>
