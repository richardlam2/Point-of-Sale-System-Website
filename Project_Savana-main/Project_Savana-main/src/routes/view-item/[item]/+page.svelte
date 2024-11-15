<script>
  import { getToastStore } from "@skeletonlabs/skeleton";
  import { goto } from "$app/navigation";
  export let data;
  let item = data.body.item;
  console.log(data.user);
  const toastStore = getToastStore();

  function addToCart() {
    console.log("Entering addToCart function");
    if (data.user == null) {
      console.log("User not logged in. Redirecting to /login");
      goto("/login");
      console.log("Item not added to cart");
      return;
    } else {
      console.log("User logged in. Adding item to cart");
      onAddToShoppingCart(item.Id);
      console.log("Item added to cart");
    }
  }
  async function onAddToShoppingCart(productId) {
    const res = await fetch(`/api/ShoppingCart`, {
      method: "POST",
      body: JSON.stringify({ productId: productId }),
    });
    const responseBody = await res.json();
    console.log(responseBody);

    if (responseBody?.body?.errorMessage != null) {
      const toastSettings = {
        message: responseBody.body.errorMessage,
        background: "variant-filled-error",
      };
      toastStore.trigger(toastSettings);
    } else {
      const toastSettings = {
        message: "Item added to cart",
        background: "variant-filled-success",
      };
      toastStore.trigger(toastSettings);
    }
  }
</script>

<div class="m-20">
  <div class="card-container">
    <div class="card">
      "Image of a {item.Name}"
    </div>
    <div class="ml-20">
      <h2
        class="mt-5 mb-5 text-center text-5xl font-bold leading-1 tracking-tight"
      >
        {item.Name}
      </h2>
      <div>This is a description</div>
      <h2
        class="mt-20 mb-5 text-left text-2xl font-bold leading-1 tracking-tight"
      >
        Cost: ${item.Price}
      </h2>
      <div class="flex justify-left">
        <button
          type="button"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          on:click={addToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</div>
<hr class="!border-t-2" />

<style>
  .card-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: Left; /* Align items to the center by default */
  }

  .card {
    width: 500px; /* Set a fixed width for the cards */
    height: 500px; /* Set a fixed height for the cards */
    margin: 1rem;
    padding: 0.5rem;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
