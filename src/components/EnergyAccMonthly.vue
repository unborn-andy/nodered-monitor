<template>
  <div>
    <b-container fluid class="pr-5">
      <h2 class="ml-4 mt-4">Energy Accumulative Monthly Chart ( kWh )</h2>
      <b-row align-v="end" class="ml-4 mt-4">
        <b-col cols="3">
          <label for="datepicker1">Select Month / Year :</label>
          <date-picker v-model="startDate" format="MMM YYYY" valueType="format" type="month" :append-to-body="false" :popup-style="{ left: 0, top: '100%', marginTop: '10px' }"></date-picker>
        </b-col>
        <b-col cols="4">
          <b-button variant="primary" size="sm" @click="requestData()">Draw Chart</b-button>
          <b-button v-if="loaded" variant="secondary" size="sm" class="ml-4" @click="downloadCSV()">
            Download CSV
            <b-icon class="ml-1" icon="file-earmark-arrow-down" aria-hidden="true"></b-icon>
          </b-button>
        </b-col>
        <b-col cols="4" class="d-flex align-items-end justify-content-end">
          <b-button v-if="loaded" variant="secondary" size="sm" @click="chartToggleAll()">
            <b-icon icon="graph-up" aria-hidden="true"></b-icon>
            Toggle Chart Lines
          </b-button>
        </b-col>
      </b-row>
      <b-row class="justify-content-start p-2 ml-4 mt-5">
        <b-col cols="12">
          <bar-chart class="canvas" v-if="loaded" :chartdata="chartData" :options="chartOptions"></bar-chart>
          <b-alert v-else show variant="warning" class="w-25">{{ alertText }}</b-alert>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import moment from "moment";
import BarChart from "../BarChart";

// Import datePicker component
import datePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";

export default {
  name: "energyAccMonthly",

  components: {
    datePicker,
    BarChart,
  },
  data() {
    return {
      table: "Energy",

      startDate: moment().format("MMM YYYY"), // "2020-02-02 02:29:30"

      //endDate: moment().format("YYYY-MM-DD HH:mm:ss"), // "2020-02-02 02:50:30"

      msgSent: "",

      loaded: false,
      alertText: "Select a time range and hit the button",

      // Chart Data and Options
      chartData: {},

      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        // fill: false,
        lineTension: 0,
        events: ["click", "mouseout"],
        tooltips: {
          enabled: true,
          mode: "label",
          callbacks: {
            label: function(tooltipItem, data) {
              var label = data.datasets[tooltipItem.datasetIndex].label || "";
              return "  " + label + " : " + tooltipItem.yLabel.toFixed(2) + " kWh";
            },
          },
        },
        legend: {
          position: "right",
          labels: {
            // This more specific font property overrides the global property
            fontColor: "black",
            fontStyle: "bold",
          },
        },
        scales: {
          yAxes: [
            {
              ticks: {
                callback: function(value) {
                  return Number(value.toFixed(2));
                },
              },
            },
          ],
          xAxes: [
            {
              type: "time",
              distribution: "series",
              time: {
                parser: "YYYY-MM-DD",
                displayFormats: { year: "DD MMM YYYY", month: "DD MMM YYYY", day: "DD MMM YYYY" },
              },
              offset: true,
              ticks: { fontStyle: "bold" },
            },
          ],
        },
      },
    };
  },
  mounted() {
    uibuilder.onChange("msg", (json) => {
      if (json.cmd == "chartEnergyAccMonthly") {
        console.info("Msg received from Node-RED server in EnergyAccMonthly:", json);
        this.chartData = json.payload;

        this.loaded = true;
      }
      if (json.cmd == "Error") {
        this.loaded = false;
        this.alertText = json.payload;
      }
    });

    // If a message is sent back to Node-RED, we can grab a copy here if we want to
    uibuilder.onChange("sentMsg", (json) => {
      //console.info('[indexjs:uibuilder.onChange:sentMsg] msg sent to Node-RED server:', newVal)
      this.msgSent = json;
    });
  },

  methods: {
    requestData() {
      this.loaded = false;
      // this.chartData  = {};

      uibuilder.send({
        cmd: "chartEnergyAccMonthly",
        payload: {
          table: this.table,
          startDate: this.startDate,
          //endDate: this.endDate,
        },
      });
      console.log("Message sent from Chart:", this.msgSent);
    },

    downloadCSV() {
      let startDate = this.startDate; // moment(this.startDate, 'MMM YYYY').format('YYYY-MM-01 00:00:00')
      //let endDate = moment(this.startDate, 'MMM YYYY').format('YYYY-MM-31 24:00:00')
      let cmd = "csvEnergyAccMonthly";

      let url = `http://${window.location.host}/csv?startDate=${startDate}&cmd=${cmd}&table=${this.table}`;
      console.log(url);
      // window.open(url, "_blank");
      window.location.assign(url);
    },

    chartToggleAll() {
      // console.log(this.$children[1]._data._chart);

      let chartId = this.$children[1]._data._chart.id;
      this.$children[1]._data._chart.data.datasets.forEach((d) => {
        d._meta[chartId].hidden = !d._meta[chartId].hidden;
      });
      //this.$children[1]._data._chart.data.datasets.forEach(d =>  d.hidden = !d.hidden)
      this.$children[1]._data._chart.update();
    },
  },
};
</script>

<style scoped>
.canvas {
  padding: 20px;
  width: 1750px !important;
  height: 650px !important;
  background-color: #f2f2f2;
  border-radius: 10px;
  box-shadow: 2px 3px 10px black;
}
</style>
