<script>
  // import Header from "./Header.svelte";
  import Foot from "./Footer.svelte";
  import Host from "./Pingger.svelte";
  import { onMount } from "svelte";

  //populating hostd list from a store.
  $: activeHosts = [];
  function findHosts() {
    activeHosts = JSON.parse(localStorage.getItem("hosts"))
  }
  onMount(findHosts);
</script>

<!-- <Header/> -->
{#each activeHosts as activeHost}
{#if activeHost.active}
<Host on:message={findHosts}
host={activeHost.host}
updateTime={activeHost.pingTime}
getReq={activeHost.getReq}
/>
{/if}
{/each}
{#if activeHosts.length < 6}
  <Foot on:message={findHosts}/>
{/if}
