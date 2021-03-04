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
<!-- <Header></Header> -->
<!-- <Host host="192.168.0.2" updateTime="1000" getReq="true" />
<Host host="192.168.0.3" updateTime="1000" getReq="true" />
<Host host="192.168.0.4" updateTime="1000" getReq="false" />
<Host host="192.168.0.114" updateTime="1000" getReq="false" />
<Host host="google.com" updateTime="1000" getReq="true" /> -->
