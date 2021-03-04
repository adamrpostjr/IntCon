<script>
  import { onMount } from "svelte";

  var addNew = { active: false };
  import hostList from "./hosts.js";

  //populating inactive hostlist from store
  var inactiveHosts = [];
  function findHosts() {
    hostList.find({ active: false }, function (err, docs) {
      inactiveHosts = docs;
    });
  }

  onMount(findHosts);
  function toggle(params) {
    addNew.active = !addNew.active;
  }
</script>

{#if addNew.active}
  <div>
    <select name="" id="">
      <option value="" selected disabled hidden>Choose existing host</option>
      {#each inactiveHosts as inactiveHost}
        <option value={inactiveHost}>{inactiveHost}</option>
      {/each}
    </select><br />
    <hr />
    <select name="" id="">
      <option value="https://">https://</option>
      <option value="http://">http://</option>
    </select>
    <input type="text" placeholder="hostname" /><br />
    <label for="number">Ping Time In ms</label><br />
    <input type="number" step="1000" value="1000" /><br />
    <label for="checkbox">HTTP status</label>
    <input type="checkbox" /><br />
    <button on:click={toggle}>Cancel</button>
    <button>Add</button>
  </div>
{/if}

{#if !addNew.active}
  <main on:click={toggle}>+</main>
{/if}

<style>
  main {
    text-align: center;
    width: 100%;
    height: 15%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border: 1px solid #f5f5f514;
    border-radius: 10px;
    color: #f5f5f514;
  }
  main:hover {
    color: #d8dee9;
    border: 1px solid #d8dee9;
  }
</style>
