<script>
	import { onMount } from 'svelte';
	import { Grid } from 'ag-grid-community';
	import { AppShell, RangeSlider } from '@skeletonlabs/skeleton'
	import { DateTime } from "luxon";
	import 'ag-grid-community/styles/ag-grid.css';
	import 'ag-grid-community/styles/ag-theme-alpine.css';
	export let data;

	let priceFilter = 1000;
	let productCountFilter = 20;

	// Grid Options are properties passed to the grid
	const gridOptions = {

		// each entry here represents one column
		columnDefs: [
			{ field: "DateCreated",
				cellDataType: "date",
				headerName: "Purchase Date"
			},
			{ field: "transaction_status", headerName: "Transaction Status" },
			{ field: "product_count", headerName: "Product Count" },
			{ field: "TotalCost",
				valueFormatter: params => formatCurrency(params.data.TotalCost)},
		],
		// default col def properties get applied to all columns
		defaultColDef: {
			sortable: true, 
			filter: true,
			flex: 1
		},
		animateRows: true, // have rows animate to new positions when sorted
	};

	function updateDateFilter(columnName, 
		value,
		filterType,
		type) {
		const model = gridOptions.api.getFilterModel();

		if(columnName in model) {
			delete model[columnName];
		}

		let dateFilter = DateTime.fromISO(value).startOf("day"); 

		model[columnName] = {
			filterType: filterType,
			type: "equals",
			dateFrom: dateFilter.toString()	
		};

		console.log(model);
		gridOptions.api.setFilterModel(model);

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

	function formatCurrency(column) {
		return column != null ? `$${column.toFixed(2)}` : ""
	}

	onMount(async () => {
		window.reloadSearchGrid = async function() {
			const gridDataFetch = await fetch(`/api/OrderHistory`);

			if(gridDataFetch.ok) {
				const response = await gridDataFetch.json();

				const jsonWithDate = response.map(data => {
					let parsedDate = DateTime.fromISO(data.DateCreated);
					data.DateCreated = new Date(parsedDate.startOf("day"))
					return data;
				});

				gridOptions.api.setRowData(jsonWithDate);
			}
		}

		const eGridDiv = document.getElementById("myGrid");
		new Grid(eGridDiv, gridOptions);

		window.reloadSearchGrid();
	});
</script>

<AppShell regionPage="">
	<svelte:fragment slot="sidebarLeft">
		<form class="w-72 bg-white shadow-md rounded px-8 pt-6 pb-8 mr-2 h-full">
			<div class="mb-4">
				<label class="block text-gray-700 text-sm font-bold mb-2" for="Category">
					Purchase Date
				</label> 

				<input type="date" class="text-slate-700 border border-slate-700" id="PurchaseDate" on:change={(e) => {updateDateFilter("DateCreated", e.target.value, "date", "equals")}}>	
			</div>
			<div class="mb-4">
				<div class="inline-block w-full">
					<label class="inline-block text-gray-700 text-sm font-bold float-left" for="NumberOfProducts"># of Products</label> 
					<label class="inline-block text-gray-700 text-sm font-bold float-right">0 - {productCountFilter}</label> 
				</div>

				<RangeSlider name="NumberOfProducts" max={20} step={1} bind:value={productCountFilter} on:change={() => {updateFilter("product_count", productCountFilter, "number", "lessThanOrEqual")}}></RangeSlider>
			</div>
			<div class="mb-4">
				<div class="inline-block w-full">
					<label class="inline-block text-gray-700 text-sm font-bold float-left" for="Price">Price</label> 
					<label class="inline-block text-gray-700 text-sm font-bold float-right">$0 - ${priceFilter}</label> 
				</div>

				<RangeSlider name="Price" max={1000} step={10} bind:value={priceFilter} on:change={() => {updateFilter("TotalCost", priceFilter, "number", "lessThanOrEqual")}}></RangeSlider>
			</div>
		</form>
	</svelte:fragment>
	<div id="myGrid" class="ag-theme-alpine w-full h-full"></div>
</AppShell>
