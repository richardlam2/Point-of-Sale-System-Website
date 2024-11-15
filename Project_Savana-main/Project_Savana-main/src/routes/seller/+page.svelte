<script>
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';

  const tableArr = [
  {
    productName: "Mouse",
    price: 65,
    inventoryCount: 33,
    category: 'Electronics',
  },
  {
    productName: "Keyboard",
    price: 110,
    inventoryCount: 15,
    category: 'Electronics',
  },
];
</script>

<style>
  .button-container {
    margin: 20px;
  }
  
  h2 {
    margin-bottom:2%;
  }
  
</style>


<div class="button-container">
    <a href="/product-form">
	<button type="button" class="btn variant-filled">Add Product</button>
	</a>
</div>

<h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">Current Product Listings</h2>


<div class="table-container">
	<table class="table table-hover">
		<thead>
			<tr>
				<th>Product Name</th>
				<th>Price</th>
				<th>Inventory Count</th>
				<th>Category</th>
				<th>Modify</th>
			</tr>
		</thead>
		<tbody>
			{#each tableArr as row, i}
				<tr>
					<td>{row.productName}</td>
					<td>{row.price}</td>
					<td>{row.inventoryCount}</td>
					<td>{row.category}</td>
					<td> <a href="/product-form" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Edit</a>
					</td>
				</tr>
			{/each}
		</tbody>
		<!-- <tfoot>
			<tr>
				<th colspan="3">Calculated Total Weight</th>
				<td>{totalWeight}</td>
			</tr>
		</tfoot> -->
	</table>
</div>
