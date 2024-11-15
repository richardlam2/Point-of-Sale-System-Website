<script>
	import { page } from '$app/stores'
	import { onMount } from 'svelte';
	import { Grid } from 'ag-grid-community';
	import { AppShell, RangeSlider, getToastStore } from '@skeletonlabs/skeleton'
	import 'ag-grid-community/styles/ag-grid.css';
	import 'ag-grid-community/styles/ag-theme-alpine.css';
	import ShoppingCartButtonRenderer from '$lib/classes/GridShoppingCartButton'
	export let data;

	$:  searchText = $page.params.search_text;
	let priceFilter = 1000;
	const toastStore = getToastStore();

	// Grid Options are properties passed to the grid
	const gridOptions = {

		// each entry here represents one column
		columnDefs: [
			{ field: "Name" },
			{ field: "Price" },
			{ field: "product_category" },
			{ field: "rating" },
			{
				field: "InventoryCount",
				headerName: "Add to cart",
				cellRenderer: ShoppingCartButtonRenderer, 
				cellRendererParams: {
					clicked: async function(params) {
						await onAddToShoppingCart(params.data.Id);
					}
				}

			},
			{
				field: "CategoryId",
				hide: true
			},
			{
				field: "InventoryCount",
				hide: true
			}

		],
		// default col def properties get applied to all columns
		defaultColDef: {
			sortable: true, 
			filter: true,
			flex: 1
		},
		animateRows: true, // have rows animate to new positions when sorted
	};

	function onCategoryChange(e) {
		if(e.target.value.toLowerCase().trim() === "all") {
			removeFilter("CategoryId");
		} else {
			updateFilter("CategoryId", e.target.value, "text", "equal")
		}
	}

	function updateFilter(columnName, 
		value,
		filterType,
		type) {
		const model = gridOptions.api.getFilterModel();

		if(columnName in model) {
			delete model[columnName];
		}

		model[columnName] = {
			filterType: filterType,
			type: type,
			filter: value
		};

		console.log(model);
		gridOptions.api.setFilterModel(model);

	}

	function removeFilter(columnName) {
		const model = gridOptions.api.getFilterModel();

		if(columnName in model) {
			delete model[columnName];
		}

		gridOptions.api.setFilterModel(model);
	}

	async function onAddToShoppingCart(productId) {
		const res = await fetch('/api/ShoppingCart', {
			method: 'POST',
			body: JSON.stringify({
				productId: productId
			})
		});

		const responseBody = await res.json();
		console.log(responseBody);

		if(responseBody?.body?.errorMessage != null) {
			const toastSettings = {
				message: responseBody.body.errorMessage,
				background: 'variant-filled-error'
			}

			toastStore.trigger(toastSettings);
		} else {
			const toastSettings = {
				message: "Successfully added item to shopping cart",
				background: 'variant-filled-success'
			}

			toastStore.trigger(toastSettings);
		}
	}

	onMount(async () => {
		window.reloadSearchGrid = async function(itemSearch) {
			const gridDataFetch = await fetch(`/api/ProductSearch?search=${itemSearch}`);

			if(gridDataFetch.ok) {
				gridOptions.api.setRowData(await gridDataFetch.json());
			}
		}
		
		const eGridDiv = document.getElementById("myGrid");
		new Grid(eGridDiv, gridOptions);
		
		const model = gridOptions.api.getFilterModel();

		model["InventoryCount"] = {
			filterType: "number",
			type: "greaterThan",
			filter: 0
		};

		gridOptions.api.setFilterModel(model);

		window.reloadSearchGrid(searchText);
	});
</script>

<AppShell>
	<svelte:fragment slot="sidebarLeft">
		<form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mr-2 h-full">
			<div class="mb-4">
				<label class="block text-gray-700 text-sm font-bold mb-2" for="Category">
					Category	
				</label> 

				<select on:change={onCategoryChange} class="select" name="Category" id="Category">
					<option value="All">All</option>
					{#each data.categories as category}
						<option value="{category.Id}">{category.Name}</option>
					{/each}
				</select>
					
				<!--<input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username">-->
			</div>
			<div class="mb-4">
				<div class="inline-block w-full">
					<label class="inline-block text-gray-700 text-sm font-bold float-left" for="Price">Price</label> 
					<label class="inline-block text-gray-700 text-sm font-bold float-right">$0 - ${priceFilter}</label> 
				</div>
					
				<RangeSlider name="Price" max={1000} step={10} bind:value={priceFilter} on:change={() => {updateFilter("Price", priceFilter, "number", "lessThanOrEqual")}}></RangeSlider>
			</div>
			<div class="mb-6 text-gray-700">
				<label class="block text-sm font-bold mb-2" for="RatingFilter">
					Rating
				</label>
				<label class="flex items-center space-x-2">
					<input class="radio" type="radio" name="RatingFilter" value="4" on:change={(event) => {updateFilter("rating", event.currentTarget.value, "number", "greaterThanOrEqual")}} />
					<p>4 Stars and up</p>
				</label>
				<label class="flex items-center space-x-2">
					<input class="radio" type="radio" name="RatingFilter" value="3" on:change={(event) => {updateFilter("rating", event.currentTarget.value, "number", "greaterThanOrEqual")}} />
					<p>3 Stars and up</p>
				</label>
				<label class="flex items-center space-x-2">
					<input class="radio" type="radio" name="RatingFilter" value="2" on:change={(event) => {updateFilter("rating", event.currentTarget.value, "number", "greaterThanOrEqual")}} />
					<p>2 Stars and up</p>
				</label>
				<label class="flex items-center space-x-2">
					<input class="radio" type="radio" name="RatingFilter" value="1" on:change={(event) => {removeFilter("rating")}} />
					<p>1 Star and up</p>
				</label>
			</div>
			<div class="mb-6 text-gray-700">
				<label class="block text-sm font-bold mb-2" for="IncludeOutOfStockFilter">
					Include Out of Stock	
				</label>

				<input class="checkbox" type="checkbox" id="IncludeOutOfStockFilter" name="IncludeOutOfStockFilter" on:change={(event) => {event.target.checked ? removeFilter("InventoryCount") : updateFilter("InventoryCount", 0, "number", "greaterThan")}}/>
			</div>
		</form>
	</svelte:fragment>
	<div id="myGrid" class="ag-theme-alpine w-full h-full"></div>
</AppShell>
