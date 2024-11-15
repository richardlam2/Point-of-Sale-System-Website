<script>
  import { TabGroup, TabAnchor } from '@skeletonlabs/skeleton';
  import { page } from '$app/stores';
</script>

<TabGroup regionPanel="h-[84vh]">
  <TabAnchor class="acc_info" href="/seller-inventory2/products" selected={$page.url.pathname === "/seller-inventory2/products"}>Products</TabAnchor>
  <TabAnchor class="ord_hist" href="/seller-inventory2/reports" selected={$page.url.pathname === "/seller-inventory2/reports"}>Reports</TabAnchor>
    <svelte:fragment slot="panel">
<slot />
      </svelte:fragment>
</TabGroup>

