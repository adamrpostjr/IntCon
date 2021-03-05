<script>
  import { onMount } from "svelte";
  import * as yup from 'yup';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
  var addNew = { active: false };
  function toggle() {
    addNew.active = !addNew.active;
  }

  let properHost = yup.object().shape({
    http: yup.string().matches(/(http:\/\/|https:\/\/)/).required(),
    host: yup.string().matches(/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$|^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)+([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$/).required(),
    ping: yup.number().required(),
    get: yup.number().required()
  })

  async function addNewHost() {
    var http // this is the way to get request
    var host = hostname.value
    var ping = pingTime.value
    var get 
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
      if(!valid) throw('not valid')
    })
    .then(function () {
      var hostList = JSON.parse(localStorage.getItem("hosts"))
      for (let i = 0; i < hostList.length; i++) {
        if(hostList[i].host.toString().toLowerCase() == host.toString().toLowerCase()) {
          throw ('have it');
        }
      }
      hostList.push({http: http, host: host, pingTime: ping, getReq: get, active: true})
      localStorage.setItem('hosts', JSON.stringify(hostList))
      dispatch('message', {
			  text: 'update'
		  });
    }).then(function () {
      toggle()
    })
    .catch(function (err) {
      console.log(err);
    });
  }
  function mountObjects() {
    
    var httpOrS = document.getElementById('httpOrS')
    var hostname = document.getElementById('hostname')
    var pingTime = document.getElementById('pingTime')
    var httpStatus = document.getElementById('httpStatus')
  }
  onMount(mountObjects)
</script>

{#if addNew.active}
  <div>
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
    <button on:click="{addNewHost}">Add</button>
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
