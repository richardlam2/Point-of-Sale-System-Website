<script>
  import "../app.postcss";
  import { initializeStores } from "@skeletonlabs/skeleton";
  import { AppShell, AppBar, Toast } from "@skeletonlabs/skeleton";
  import { Search } from "lucide-svelte";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  export let data;

  $: console.log(data);
  function goToSearchPage() {
    if (
      document.getElementById("PageSearchInput").value === "" ||
      document.getElementById("PageSearchInput").value == null
    )
      goto("/");
    else {
      $: if (
        $page.route != undefined &&
        $page.route.id.indexOf("search") > -1
      ) {
        window.reloadSearchGrid(
          document.getElementById("PageSearchInput").value
        );
      } else {
        goto("/search/" + document.getElementById("PageSearchInput").value);
      }
    }
  }

  function onSearch(e) {
    if (e.key.toLowerCase().trim() === "enter") goToSearchPage();
  }

  initializeStores();

  $: ({ users } = data);
</script>

<Toast />

<AppShell class="h-screen p-1">
  <svelte:fragment slot="header">
    <!-- App Bar -->
    <AppBar
      gridColumns="grid-cols-3"
      slotDefault="place-self-center"
      slotTrail="place-content-end"
    >
      <svelte:fragment slot="lead">
        <a class="text-xl font-bold" href="/">Savana</a>
      </svelte:fragment>

      <div
        class="input-group input-group-divider grid-cols-[auto_1fr_auto] w-max"
      >
        <input
          id="PageSearchInput"
          type="text"
          placeholder="Search..."
          class="pl-3"
          on:keyup={onSearch}
        />

        <button
          on:click={goToSearchPage}
          type="button"
          class="btn-icon variant-filled"
        >
          <Search />
        </button>
      </div>


      <svelte:fragment slot="trail">

	<form method="POST">
	  {#if data.user == null}
	    <a
       class="btn btn-sm variant-ghost-surface"
       href="/login"
       >
       Login
	    </a>
	    <a
       class="btn btn-sm variant-ghost-surface"
       href="/register-account"
       >
       Register
	    </a>
	  {:else}
	    {#if data.isUserActive}
	    	
	    <a
       class="btn btn-sm variant-ghost-surface"
       href="/adminmenu"
       rel="noreferrer"
       >
       Admin
	    </a>
	    {/if}
	    <a
       class="btn btn-sm variant-ghost-surface"
       href="/account/account-information"
       rel="noreferrer"
       >
       Account
	    </a>
	    <a class="btn btn-sm variant-ghost-surface" href="/seller"
						 >Seller</a>
     <a
       class="btn btn-sm variant-ghost-surface"
       href="/cart"
       >
       Cart
     </a>
     <button formaction="/logout" type="submit" class="btn btn-sm variant-ghost-surface" role="button">Logout</button>
	  {/if}
	</form>
      </svelte:fragment>
    </AppBar>
  </svelte:fragment>
  <!-- Page Route Content -->
  <slot />
</AppShell>
