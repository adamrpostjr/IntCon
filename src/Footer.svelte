<script>
  import { onMount } from "svelte";
  import * as yup from 'yup';

  var addNew = { active: false };
  var hosts = JSON.parse(localStorage.getItem("hosts"))
  //populating inactive hostlist from store
  $: inactiveHosts = [];
  function findHosts() {
    for (let i = 0; i < hosts.length; i++) {
      if (hosts[i].active == false) {
        inactiveHosts.push(hosts[i])
      }
    }
  }
  onMount(findHosts);
  
  function mountObjects() {
    var existing = document.getElementById('existing')
    var httpOrS = document.getElementById('httpOrS')
    var hostname = document.getElementById('hostname')
    var pingTime = document.getElementById('pingTime')
    var httpStatus = document.getElementById('httpStatus')
  }
  onMount(mountObjects)

  let properHost = yup.object().shape({
    http: yup.string().matches(/(http:\/\/|https:\/\/)/).required(),
    host: yup.string().matches(/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$|^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)+([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$/).required(),
    ping: yup.number().required(),
    get: yup.number().required()
  })

  function toggle() {
    addNew.active = !addNew.active;
  }
  function addHost() {
    // console.log(hostList);
    if (existing.value >= 1) {
      addExistingHost()
    }else{
      addNewHost()
    }
  }
  function addExistingHost() {
    console.log('existing');
  }
  async function addNewHost() {
    let http // this is the way to get request
    let host = hostname.value
    let ping = pingTime.value
    let get
    httpOrS.value == 1 ? http = 'https://' : http = 'http://'
    httpStatus.checked ? get = '1' : get = '0'

    // now we need to do validation
    properHost.isValid({
      http: http,
      host: host,
      ping: ping,
      get: get
    })
  .then(function (valid) {
    // valid; // => true
    console.log(valid);
    hostList.insert({http: http, host: host, pingTime: ping, getReq: get, active: true}, function (err, newDocs) {
        console.log(newDocs);
        console.log(err);
      });

  });
    
    
  }
  $: zeroActive = false
</script>

{#if addNew.active}
  <div>
    <select name="existing" id="existing">
      <option value="0" selected>Choose an Existing Host</option>
      {#each inactiveHosts as inactiveHost}
        <option value={inactiveHost}>{inactiveHost}</option>
      {/each}
    </select><br />
    {#if zeroActive == true}
      <hr />
      <select name="httpOrS" id="httpOrS">
        <option value="0">http://</option>
        <option value="1">https://</option>
      </select>
      <input id="hostname" type="text" placeholder="hostname" /><br />
      <label for="number">Ping Time In ms</label><br />
      <input id="pingTime" type="number" step="1000" value="1000" /><br />
      <label for="checkbox">HTTP status</label>
      <input id="httpStatus" type="checkbox" /><br />
      <button on:click={toggle}>Cancel</button>
      <button on:click="{addHost}">Add</button>
    {/if}
  </div>
{/if}

{#if !addNew.active}
  <add class="add" on:click={toggle}>+</add>
{/if}

<style>
  .add {
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
  .add:hover {
    color: #d8dee9;
    border: 1px solid #d8dee9;
  }
</style>
