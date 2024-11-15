
<style>
  .form-container {
    margin-top:2%;
    margin-right: 10%;
    margin-left: 10%;
    width: 80%;
    display: flex;
    flex-direction: column; /* To center vertically */
    justify-content: center; /* Center horizontally */
    align-items: center;
  }
  
  button {
    margin-top:4%;
    margin-bottom: 4%;
  
  }
  
  h2 {
  margin-bottom: 2%;
  }
</style>


<script>
let formData = {
    productName: '',
    price: '',
    inventoryCount: '',
    category: 1 
  };
</script>


<div class="form-container">
    <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">Please enter product details</h2>
    <form method="POST">
        <label class="label">
        	<span>Product Name</span>
        	<input class="input" name="ProductName" type="text" placeholder="Input" bind:value={formData.productName} />
        </label>
        <label class="label">
        	<span>Price</span>
        	<input class="input" name="PriceProduct" type="text" placeholder="Price of Product"  bind:value={formData.price}/>
        </label>
        <label class="label">
        	<span>Inventory Count</span>
        	<input class="input" name="InventoryCount"   type="text" placeholder="Count"  bind:value={formData.inventoryCount}/>
        </label>
        <label class="label">
        	<span>Category of Product</span>
            <select class="select" name="Category" bind:value={formData.category}>
            	<option value="Clothing, Shoes, Jewelry & Watches">Clothing, Shoes, Jewelry & Watches</option>
            	<option value="Books">Books</option>
            	<option value="Music, Movies & Games">Music, Movies & Games</option>
            	<option value="Computers">Computers</option>
            	<option value="Electronics">Electronics</option>
            	<option value="Tools, Home, Garden">Tools, Home, Garden</option>
            	<option value="Pet Supplies">Pet Supplies</option>
            	<option value="Sports">Sports</option>
            	<option value="Health & Beauty">Health & Beauty</option>
            	<option value="Outdoors">Outdoors</option>
            </select>
        </label>
        <button type="submit" class="btn variant-filled">Submit</button>
    </form>
</div>