<script>
  import { goto } from "$app/navigation";
  import {
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
    Checkbox,
  } from "flowbite-svelte";
  import { SlideToggle } from "@skeletonlabs/skeleton";
  export let data;
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import { getToastStore } from "@skeletonlabs/skeleton";
  //console.log(data);
  const toastStore = getToastStore();

  let sellers = [];
  let selected = false;

  // Receive data from load function
  $: {
    sellers = data.body.sellers || [];
  }

  async function onToggleClick(e, seller) {
      const res = await fetch('/api/ToggleSeller', {
        method: 'PUT',
        body: JSON.stringify({
          sellerId: seller.id,
          isActive: e.target.checked
        })
      });

      const responseBody = await res.json();
    
      if(responseBody?.body?.errorMessage != null) {
        const toastSettings = {
          message: responseBody.body.errorMessage,
          background: 'variant-filled-error'
        }

        toastStore.trigger(toastSettings);
      } else {
        const toastSettings = {
          message: "Successfully toggled user",
          background: 'variant-filled-success'
        }

        toastStore.trigger(toastSettings);
      }
  }
</script>

<div class="Title_container">
  <h2 class="mt-10 text-center text-5xl font-bold leading-9 tracking-tight">
    Sellers
  </h2>
  <div class="flex justify-center" />
</div>

<div class="table-container">
  <table class="table table-hover">
    <thead>
      <tr>
        <th>First Name</th>
        <th>Second Name</th>
        <th>Active</th>
      </tr>
    </thead>
    <tbody>
      {#each sellers as seller, i}
        <tr>
          <td>{seller.FirstName}</td>
          <td>{seller.LastName}</td>
          <td class="!p-4"
              >
              {#if seller.is_active === true}
              <SlideToggle
              on:click={(event) => onToggleClick(event, seller)}
              name={seller.id}
             checked 
              active="bg-primary-500"
              size="lg"/>
              {:else}
                
              <SlideToggle
              on:click={(event) => onToggleClick(event, seller)}
              name={seller.id}
              active="bg-primary-500"
              size="lg"/>
              {/if}
            
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<!-- 
<h2 class="mt-5 mb-5 text-center text-2xl font-bold leading-1 tracking-tight">
  For You
</h2>
<div class="ml-40 mr-40">
  <div class="card-container">
    {#each sellers as item (item.Id)}
      <a
        href={"/view-item/" + item.Id}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div class="card">
          {item.FirstName}
        </div>
      </a>
    {/each}
  </div>
</div> -->

<style>
  .Title_container {
    display: flex;
    flex-wrap: wrap;
    justify-content: Left; /* Align items to the center by default */
    margin-left: 5%;
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

  h2 {
    margin-bottom: 2%;
  }
</style>
