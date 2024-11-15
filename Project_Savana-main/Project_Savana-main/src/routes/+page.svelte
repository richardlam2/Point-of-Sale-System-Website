<script>
  import { goto } from "$app/navigation";
  export let data;
  //console.log(data);

  let items = [];

  // Receive data from load function
  $: {
    items = data.body.items || [];
  }
</script>

<h2 class="mt-5 mb-5 text-center text-2xl font-bold leading-1 tracking-tight">
  Todays Deals
</h2>

<hr class="!border-t-2" />

<!-- Todays items slides -->
{#if items.length < 0}
  <div
    class="snap-x scroll-px-4 snap-mandatory scroll-smooth flex gap-4 overflow-x-auto px-4 py-5 ml-20 mr-20"
  >
    {#each items as item (item.Id)}
      <a
        href={"/view-item/" + item.Id}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div class="card">
          {item.Name}
        </div>
      </a>
    {/each}
  </div>
{:else}
  <div class="m-10 text-center">No items are currently on sale.</div>
{/if}

<hr class="!border-t-2" />

<!-- Random items in main page -->
<h2 class="mt-5 mb-5 text-center text-2xl font-bold leading-1 tracking-tight">
  For You
</h2>
<div class="ml-40 mr-40">
  <div class="card-container">
    {#each items as item (item.Id)}
      <a
        href={"/view-item/" + item.Id}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div class="card">
          {item.Name}
        </div>
      </a>
    {/each}
  </div>
</div>

<style>
  .card-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center; /* Align items to the center by default */
  }

  .card {
    width: 200px; /* Set a fixed width for the cards */
    height: 200px; /* Set a fixed height for the cards */
    margin: 1rem;
    padding: 1rem;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
