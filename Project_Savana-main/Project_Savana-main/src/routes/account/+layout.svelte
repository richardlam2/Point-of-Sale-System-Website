<script>
  import { TabGroup, TabAnchor } from '@skeletonlabs/skeleton';
  import { page } from '$app/stores';
</script>

<TabGroup regionPanel="h-[84vh]">
  <TabAnchor class="acc_info" href="/account/account-information" selected={$page.url.pathname === "/account/account-information"}>Account Infomation</TabAnchor>
  <TabAnchor class="ord_hist" href="/account/order-history" selected={$page.url.pathname === "/account/order-history"}> Order History</TabAnchor>
    <svelte:fragment slot="panel">
<slot />
      </svelte:fragment>
</TabGroup>

