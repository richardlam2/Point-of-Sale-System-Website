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
    
    p {
      margin-bottom: 4%;
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
  export let data;
</script>
 
  
  
  
  
  
  
  
  <div class="form-container">
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">Please enter details to add inventory for {data.products[0].Name}</h2>
      
      <form method="POST">
        <p>Current Count: {data.products[0].InventoryCount}</p>
          <label class="label">
              <input class="input" name="newInventory" type="text" placeholder="Number of items added"/>
          </label>
          <button type="submit" class="btn variant-filled">Submit</button>
      </form>
  </div>