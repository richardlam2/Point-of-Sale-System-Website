<style>
    .custom-sidebar {
        width: 5%; /* Adjust the width as needed */
    }
    
    .button-container {
        margin: 20px;
    }
</style>
<script>
	import { page } from '$app/stores'
	import { onMount } from 'svelte';
	import { Grid } from 'ag-grid-community';
	import { AppShell, RangeSlider, getToastStore } from '@skeletonlabs/skeleton'
	import 'ag-grid-community/styles/ag-grid.css';
	import 'ag-grid-community/styles/ag-theme-alpine.css';
	import ShoppingCartButtonRenderer from '$lib/classes/GridShoppingCartButton'
	export let data;
	console.log("GRID SELLER PAGE RECIEVED ", data);
	console.log("PRODUCTS", data.products);

	$:  searchText = $page.params.search_text;
	let priceFilter = 1000;
	const toastStore = getToastStore();

	// Grid Options are properties passed to the grid
	const gridOptions = {

		// each entry here represents one column
		columnDefs: [
			{ field: "Name" },
			{ field: "Price" },
			{ field: "product_category.Name" },
			{ field: "InventoryCount", 
    			cellStyle: function(params) {
                    
                    if (params.value < 10) {
                        return { backgroundColor: 'red', color: 'white' }; 
                    }
                        return null; // Return null to use default styles
                    },
            },
			
			{
				field: "InventoryCount",
				headerName: "Modify Count",
				cellRenderer: ShoppingCartButtonRenderer, 
				cellRendererParams: {
					clicked: async function(params) {
						await addProduct(params.data.Id);
					}
				}

			},
            {
				field: "InventoryCount",
				headerName: "Remove",
				cellRenderer: ShoppingCartButtonRenderer, 
				cellRendererParams: {
					clicked: async function(params) {
						await deleteProduct(params.data.Id);
					}
				}

			},
			{
				field: "CategoryId",
				hide: true
			},
			{ 
			    field: "rating",
			    hide: true
			},
			

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

		console.log(model);
		gridOptions.api.setFilterModel(model);

	}

	async function addProduct(productId) {
        
        window.location.href = `/update-inventory?productData=${encodeURIComponent(JSON.stringify(productId))}`;
     

        
		// const res = await fetch('/api/ShoppingCart', {
		// 	method: 'POST',
		// 	body: JSON.stringify({
		// 		productId: productId
		// 	})
		// });

		// const responseBody = await res.json();
		// console.log(responseBody);

		// if(responseBody?.body?.errorMessage != null) {
		// 	const toastSettings = {
		// 		message: responseBody.body.errorMessage,
		// 		background: 'variant-filled-error'
		// 	}

		// 	toastStore.trigger(toastSettings);
		// } else {
		// 	const toastSettings = {
		// 		message: "Successfully added item to shopping cart",
		// 		background: 'variant-filled-success'
		// 	}

		// 	toastStore.trigger(toastSettings);
		// }
	}
	
	async function deleteProduct(productId) {
        window.location.href = `/delete-product?productData=${encodeURIComponent(JSON.stringify(productId))}`;
    }

	onMount(async () => {
		window.reloadSearchGrid = async function(itemSearch) {
			// const gridDataFetch = await fetch(`/api/ProductSearch?search=${itemSearch}`);

			
			gridOptions.api.setRowData(data.products);
			
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
<div class="button-container">
    <a href="/product-form">
	<button type="button" class="btn variant-filled">Add Product</button>
	</a>
</div>
<AppShell>
	<svelte:fragment slot="sidebarLeft">
		<form class="bg-white shadow-md rounded px-1 pt-6 pb-8 mr-2 h-full">
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
