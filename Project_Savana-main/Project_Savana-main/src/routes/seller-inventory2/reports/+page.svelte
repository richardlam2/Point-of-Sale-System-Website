<script>
	import { onMount } from 'svelte';
	import { Grid } from 'ag-grid-community';
	import 'ag-grid-community/styles/ag-grid.css';
	import 'ag-grid-community/styles/ag-theme-alpine.css';

	// Grid Options are properties passed to the grid
	const gridOptions = {
      getRowClass: params => {
        if(params.data.LowInventory)
          return 'bg-red-500';
      },

		// each entry here represents one column
		columnDefs: [
			{ field: "Name" },
			{ field: "Price",	valueFormatter: params => formatCurrency(params.data.Price)},
			{ field: "product_category", headerName: "Product Category" },
			{ field: "InventoryCount" },
			{ field: "total_sales",	headerName: "Total Sales"},
			{ field: "total_revenue", valueFormatter: params => formatCurrency(params.data.total_revenue), headerName: "Total Revenue"},
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

	function formatCurrency(column) {
		return column != null ? `$${column.toFixed(2)}` : ""
	}

	function onFilterChange(e) {
		if(e.target.value.toLowerCase().trim() === "highest sales"){
          updateSort("total_sales", "desc");
		} else if(e.target.value.toLowerCase().trim() === "lowest sales"){
          updateSort("total_sales", "asc");
		} else if(e.target.value.toLowerCase().trim() === "highest revenue"){
          updateSort("total_revenue", "desc");
		} else if(e.target.value.toLowerCase().trim() === "lowest revenue"){
          updateSort("total_revenue", "asc");
		} else if(e.target.value.toLowerCase().trim() === "highest inventory"){
          updateSort("InventoryCount", "desc");
		} else if(e.target.value.toLowerCase().trim() === "lowest inventory"){
          updateSort("InventoryCount", "asc");
		}
	}

    function updateSort(columnName, sort) {
      gridOptions.columnApi.applyColumnState({
        state: [
          {
            colId: columnName,
            sort: sort,
            sortIndex: 0
          }
        ],
        defaultState: { sort: null }
      });
    }

	onMount(async () => {
		window.reloadSearchGrid = async function() {
			const gridDataFetch = await fetch("/api/SellerReports");

			if(gridDataFetch.ok) {
              gridOptions.api.setRowData(await gridDataFetch.json());
              updateSort("total_sales", "desc");
			}
		}
		
		const eGridDiv = document.getElementById("myGrid");
		new Grid(eGridDiv, gridOptions);

		window.reloadSearchGrid();
	});
</script>

<div class="flex flex-row h-[80vh]">
  <div class="flex-1">
    <div class="flex flex-row items-center bg-white shadow-md rounded px-2 h-12 text-slate-700">
      <label>View: </label>
      <select on:change={onFilterChange} class="select w-1/5 text-white ml-2" name="Category">
        <option value="Highest Sales">Highest Sales</option>
        <option value="Lowest Sales">Lowest Sales</option>
        <option value="Highest Revenue">Highest Revenue</option>
        <option value="Lowest Revenue">Lowest Revenue</option>
        <option value="Highest Inventory">Highest Inventory</option>
        <option value="Lowest Inventory">Lowest Inventory</option>
      </select>
    </div>

    <div id="myGrid" class=" ag-theme-alpine h-full"></div>
  </div>
</div>
