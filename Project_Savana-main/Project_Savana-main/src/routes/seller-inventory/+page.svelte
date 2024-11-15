<script>
import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
export let data;
</script>

<style>
  .button-container {
    margin: 20px;
  }
  
  h2 {
    margin-bottom:2%;
  }
  
.low-inventory {
  color: red; 
}
</style>

<div class="button-container">
    <a href="/product-form">
	<button type="button" class="btn variant-filled">Add Product</button>
	</a>
</div>


{#if data.products.length > 0}
<h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">Current Product Listings</h2>

	<div class="table-container">
		<table class="table table-hover">
			<thead>
				<tr>
					<th>Product Name</th>
					<th>Price</th>
					<th>Inventory Count</th>
					<th>Category</th>
					<th>Update Inventory</th>
					<th>Delete Product</th>
				</tr>
			</thead>
			<tbody>
				{#each data.products as product (product.Id)}
			        <tr>
			          <td>{product.Name}</td>
			          <td>${product.Price}</td>
			          <td class="inventory-cell">
						{#if product.LowInventory}
						  <span class="low-inventory">Low Inventory! Below threshold of 10. Current count: {product.InventoryCount}</span>
						{:else}
						  <span>{product.InventoryCount}</span>
						{/if}
					  </td>
			          <td>{product.product_category['Name']}</td>
			          <td>
			            <a href="/update-inventory?productData={JSON.stringify(product.Id)}" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Edit</a>
			          </td>
			          <td>
			            <a href="/delete-product?productData={JSON.stringify(product.Id)}" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Remove</a>
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

{:else}
<h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">Currently have no product listings</h2>
{/if}


