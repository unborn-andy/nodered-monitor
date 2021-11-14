<template>
  <div>
    <b-container class="ml-4">
      <h2 class="mt-4">Chart Template</h2>
      <b-row align-v="end" class="mt-4">
        <b-col cols="3">
          <label for="datepicker1">Select Start Date :</label>
          <date-picker v-model="startDate" format="YYYY-MM-DD HH:mm:ss" valueType="format" type="datetime" :append-to-body="false" :popup-style="{ left: 0, top: '100%', marginTop: '10px' }"></date-picker>
        </b-col>
        <b-col cols="3">
          <label for="datepicker1">Select End Date :</label>
          <date-picker v-model="endDate" format="YYYY-MM-DD HH:mm:ss" valueType="format" type="datetime" :append-to-body="false" :popup-style="{ left: 0, top: '100%', marginTop: '10px' }"></date-picker>
        </b-col>
        <b-col cols="4">
          <b-button variant="primary" size="sm" @click="requestData()">Draw Chart</b-button>
          <b-button v-if="loaded" variant="secondary" size="sm" class="ml-4" @click="downloadCSV()">Download CSV</b-button>
        </b-col>
      </b-row>
      <b-row class="justify-content-start p-2 mt-5">
        <b-col cols="8">
          <line-chart class="canvas" v-if="loaded" :chartdata="chartData" :options="chartOptions"></line-chart>
          <b-alert v-else show variant="warning">{{ alertText }}</b-alert>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import moment from "moment";
import LineChart from "../LineChart";

// Import datePicker component
import datePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";

export default {
  name: "Chart",

  components: {
    datePicker,
    LineChart,
  },
  data() {
    return {
      table: "Volts",

      startDate: moment()
        .subtract(1, "days")
        .format("YYYY-MM-DD 00:00:00"), // "2020-02-02 02:29:30"

      endDate: moment().format("YYYY-MM-DD HH:mm:ss"), // "2020-02-02 02:50:30"

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
              return tooltipItem.yLabel.toFixed(2);
            },
          },
        },
        legend: {
          labels: {
            // This more specific font property overrides the global property
            fontColor: "black",
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
              time: {
                parser: "YYYY-MM-DD HH:mm:ss",
                displayFormats: { hour: "DD MMM YYYY HH:mm" },
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
    
      if (json.cmd == "Chart") {
          console.info("Msg received from Node-RED server in Chart:", json);
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
        cmd: "chartTemplate",
        payload: {
          table: this.table,
          startDate: this.startDate,
          endDate: this.endDate,
        },
      });
      console.log("Message sent from Chart:", this.msgSent);
    },

    downloadCSV() {
      let url = `http://${window.location.host}/csv?startDate=${this.startDate}&endDate=${this.endDate}&table=${this.table}`;
      console.log(url);
      // window.open(url, "_blank");
      window.location.assign(url);
    },
  },
};
</script>

<style scoped>
.canvas {
  padding: 20px;
  width: 1000px !important;
  height: 600px !important;
  background-color: #f2f2f2;
  border-radius: 10px;
  box-shadow: 2px 3px 10px black;
}
</style>
