<script>
	import Header from './Header.svelte'
	import Foot from './Footer.svelte';
	import Host from './Pingger.svelte'
	const storage = require('electron-json-storage');
</script>


<!-- <Header></Header> -->
<Host host="google.com" updateTime="1000" getReq='true'></Host>
<Host host="amazon.com" updateTime="1000" getReq='true'></Host>
<Host host="facebook.com" updateTime="1000" getReq='true'></Host>
<Host host="yahoo.com" updateTime="1000" getReq='true'></Host>
<Host host="cnn.com" updateTime="1000" getReq='true'></Host>
<Foot/>
