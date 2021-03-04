<script>
  export let host;
  export let updateTime;
  export let getReq;

  import Chart from "chart.js";
  import { onMount } from "svelte";
  import SvelteTooltip from "svelte-tooltip";
  const fetch = require("node-fetch");

  var hostChart;
  var httpStatus = "n";

  $: toolTipStatus = "null";
  $: toolTip = toolTipStatus;

  var ping = require("ping");
  async function doPing() {
    ping.promise.probe(host).then(function (res) {
      hostChart.data.datasets[0].data.shift();
      hostChart.data.datasets[0].data.push(res.avg);
      hostChart.data.datasets[1].data.shift();
      hostChart.data.datasets[1].data.push(res.packetLoss);
      hostChart.update();
    });
    setTimeout(() => {
      doPing();
    }, updateTime);
  }
  doPing();

  if (getReq == "true") {
    function checkStatus(res) {
      if (res.ok) {
        httpStatus = "p";
        toolTipStatus = res.status;
      } else {
        httpStatus = "f";
        toolTipStatus = res.status;
      }
    }
    async function doGet() {
      fetch("http://" + host)
        .then(checkStatus)
        .catch(checkStatus);
      setTimeout(() => {
        doGet();
      }, 600000);
    }
    doGet();
  }

  function drawChart() {
    var ctx = document.getElementById("myChart-" + host).getContext("2d");
    var gradientFill = ctx.createLinearGradient(0, 0, 0, 290);
    gradientFill.addColorStop(0, "rgba(173, 53, 186, 1)");
    gradientFill.addColorStop(0.2, "rgba(173, 53, 186, 0.1)");
    hostChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: [1, 2, 3, 4, 5, 6, 7, 8],
        datasets: [
          {
            label: "Avg Round Trip",
            data: [0, 0, 0, 0, 0, 0, 0, 0],
            backgroundColor: gradientFill,
            borderColor: ["rgba(0, 59, 0, 1)"],
            borderWidth: 2,
          },
          {
            label: "Packets Lost",
            data: [0, 0, 0, 0, 0, 0, 0, 0],
            backgroundColor: [
              "rgba(128, 0, 0, 1)",
              "rgba(128, 0, 0, 1)",
              "rgba(128, 0, 0, 1)",
              "rgba(128, 0, 0, 1)",
              "rgba(128, 0, 0, 1)",
              "rgba(128, 0, 0, 1)",
              "rgba(128, 0, 0, 1)",
              "rgba(128, 0, 0, 1)",
            ],
            borderColor: [
              "rgba(128, 0, 0, 1)",
              "rgba(128, 0, 0, 1)",
              "rgba(128, 0, 0, 1)",
              "rgba(128, 0, 0, 1)",
              "rgba(128, 0, 0, 1)",
              "rgba(128, 0, 0, 1)",
              "rgba(128, 0, 0, 1)",
              "rgba(128, 0, 0, 1)",
            ],
            borderWidth: 2,
            pointBorderColor: "#D8DEE9",
            pointBackgroundColor: "#D8DEE9",
            type: "bar",
          },
        ],
      },
      options: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: host,
          fontColor: "#D8DEE9",
        },
        animation: {
          duration: 6,
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                fontColor: "#D8DEE9",
                stepSize: 1,
              },
            },
          ],
          xAxes: [
            {
              ticks: {
                fontColor: "#D8DEE9",
              },
            },
          ],
        },
      },
    });
  }
  onMount(drawChart);
</script>

<div>
  <canvas id="myChart-{host}" width="278" height="112" />
  {#if getReq == "true"}
    <span class="httpStatus">
      HTTP Status:
      <SvelteTooltip tip={toolTip} right color="lime">
        <span class={httpStatus} id="httpCode" />
      </SvelteTooltip>
    </span>
  {/if}
</div>

<style>
  .httpStatus {
    font-size: 12px;
    position: relative;
    bottom: 10px;
  }
  #httpCode {
    /* background: lime; */
    width: 10px;
    height: 10px;
    display: inline-block;
    border-radius: 10px;
    position: relative;
    bottom: -1.4px;
    margin-left: 2px;
  }
  .n {
    background: grey;
  }
  .p {
    background: lime;
  }
  .f {
    background: red;
  }
</style>
