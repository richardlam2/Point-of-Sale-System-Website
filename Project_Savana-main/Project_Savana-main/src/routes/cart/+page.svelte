<script>
  import { getToastStore } from "@skeletonlabs/skeleton";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { tick } from "svelte";
  export let data;

  const toastStore = getToastStore();
  $: console.log(data);

  let total = {
    totalCost: data.body.products
      .reduce((acc, obj) => {
        return acc + obj.Price;
      }, 0)
      .toFixed(2),
  };

  async function removeItem(i) {
    const gridDataFetch = await fetch(
      `/api/ShoppingCart?shoppingCartItemId=${i.Id}`,
      {
        method: "DELETE",
      }
    ).then((res) => {
      const toastSettings = {
        message: "Successfully removed item from shopping cart",
        background: "variant-filled-success",
      };
      toastStore.trigger(toastSettings);
      window.reloadpage();
    });
  }

  onMount(async () => {
    window.reloadpage = function () {
      window.location.reload();
    };
  });
</script>

<h2 class="mt-5 text-center text-2xl font-bold leading-9 tracking-tight">
  Your Shopping Cart
</h2>
<hr class="mt-5 !border-t-2" />

<div class="flex justify-between">
  <div class="card-container ml-2 mt-2">
    {#each data.body.products as item, index (item.Id)}
      <div class="card">
        <div align="center" style="font-size:larger" class="font-semibold">
          {item.Name}
        </div>
        <div align="left" class="mt-4">
          Category: {item.product_category}
        </div>
        <div align="left" class="mt-2">Rating: Stars</div>
        <div align="left" class="mt-2">
          Price: ${item.Price}
        </div>

        <div class="mt-2 flex justify-between">
          <button
            on:click={() => removeItem(item)}
            class="primary sm underline hover:underline-offset-2"
          >
            Delete
          </button>
          {#each data.body.counts as find (find.Id)}
            {#if find.Id == item.ProductId && find.InventoryCount > 10}
              <div class="text-green-500 font-semibold">In Stock</div>
            {:else if find.Id == item.ProductId && find.InventoryCount <= 10 && find.InventoryCount > 0}
              <div class="text-yellow-300 font-semibold">
                Only {find.InventoryCount} Left!
              </div>
            {:else if find.Id == item.ProductId && find.InventoryCount == 0}
              Out of Stock
            {/if}
          {/each}
        </div>
      </div>
    {/each}
  </div>
  <div class="mr-16 mt-8 ml-4">
    <div class="ml-1 mt-2 mb-3 font-semibold">
      Subtotal ({data.body.products.length} Items): ${total.totalCost}
    </div>
    <a
      class="btn bg-sky-200 text-black font-semibold rounded-full hover:text-white hover:bg-sky-600 hover:border-transparent"
      href="/purchase-items"
    >
      Proceed to checkout
    </a>
  </div>
</div>

<style>
  .card-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .card {
    width: 350px;
    height: 200px;
    margin: 1dvb;
    padding: 1rem;
    justify-content: center;
    align-items: center;
  }
</style>
