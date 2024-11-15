
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
export let data;
</script>
  
  
  <div class="form-container">
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">Please confirm you want to remove {data.products[0].Name} from listings</h2>
      <form method="POST">
        <label class="label">
            <span>Press submit to remove product.</span>
            <select class="select" name="Operation">
                <option value="Remove">Yes I want to delete {data.products[0].Name}</option>
            </select>
        </label>
        <button type="submit" class="btn variant-filled">Submit</button>
      </form>
  </div>