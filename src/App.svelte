<script>
  import Header from "./Header.svelte";
  import Foot from "./Footer.svelte";
  import Host from "./Pingger.svelte";
  import { onMount } from "svelte";
  import hostList from "./hosts.js";

  //populating hostd list from a store.
  var activeHosts = [];
  function findHosts() {
    hostList.find({ active: true }, function (err, docs) {
      activeHosts = docs;
    });
  }
  onMount(findHosts);
</script>

{#each activeHosts as activeHost}
  <Host
    host={activeHost.host}
    updateTime={activeHost.updateTime}
    getReq={activeHost.getReq}
  />
{/each}
{#if activeHosts.length < 4}
  <Foot />
{/if}
