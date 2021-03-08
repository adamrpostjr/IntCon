<script>
//   const remote = require('electron').remote;
//   console.log(remote.getCurrentWindow());
  function test() {
      console.log()
  }
  function minimize() {
      console.log('test');
    var window = remote.getCurrentWindow();
    window.minimize();
  }
  function close() {
    var window = remote.getCurrentWindow();
    window.close();
  }
</script>

<main class="header">
<span class="left" ><img src="" alt=""></span>
<span class="right" on:click={minimize}><min >-</min> X</span>
</main>
<br>

<style>
    min{
        font-size: 25px;
    }
    .header{
        position: absolute;
        left: 0;
        top: 0;
        background: grey;
        width: 100%;
    }
    .right{
        float: right;
    }
    .left{
        float: left;
    }
</style>