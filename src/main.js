import App from './App.svelte';

var hostList = JSON.parse(localStorage.getItem("hosts"))
if (!hostList || hostList.length == 0) {
	localStorage.setItem('hosts', JSON.stringify([{http:'https://', host: '', pingTime: 1000, get: false, active: false}]))
}

const app = new App({
	target: document.body
});


export default app;