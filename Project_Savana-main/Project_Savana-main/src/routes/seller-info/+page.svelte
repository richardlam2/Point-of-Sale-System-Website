
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
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">Please enter seller information</h2>
      <form method="POST">
          <label class="label">
              <span>Company Name</span>
              <input class="input" name="CompanyName" type="text" placeholder="Input" bind:value={formData.productName} />
          </label>
          <button type="submit" class="btn variant-filled">Submit</button>
      </form>
  </div>