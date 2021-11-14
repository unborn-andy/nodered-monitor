<template>
  <div>
    <b-container fluid class="pr-5">
      <h2 class="ml-4 mt-4">Volts Daily Chart ( V )</h2>
      <b-row align-v="end" class="ml-4 mt-4">
        <b-col cols="3">
          <label for="datepicker1">Select Start Date :</label>
          <date-picker v-model="startDate" format="YYYY-MM-DD" valueType="format" type="date" :append-to-body="false" :popup-style="{ left: 0, top: '100%', marginTop: '10px' }"></date-picker>
        </b-col>
        <!-- <b-col cols="3">
          <label for="datepicker1">Select End Date :</label>
          <date-picker v-model="endDate" format="YYYY-MM-DD HH:mm:ss" valueType="format" type="datetime" :append-to-body="false" :popup-style="{ left: 0, top: '100%', marginTop: '10px' }"></date-picker>
        </b-col> -->
        <b-col cols="4">
          <b-button variant="primary" size="sm" @click="requestData()">Draw Chart</b-button>
          <b-button v-if="loaded" variant="secondary" size="sm" class="ml-4" @click="downloadCSV()">
            Download CSV
            <b-icon class="ml-1" icon="file-earmark-arrow-down" aria-hidden="true"></b-icon>
          </b-button>
        </b-col>
        <b-col cols="4" class="d-flex align-items-end justify-content-end">
          <b-button v-if="loaded" variant="secondary" size="sm" @click="chartToggleAll()"><b-icon icon="graph-up" aria-hidden="true"></b-icon> Toggle Chart Lines</b-button>
        </b-col>
      </b-row>
      <b-row class="justify-content-start p-2 ml-4 mt-5">
        <b-col cols="12">
          <line-chart class="canvas" v-if="loaded" :chartdata="chartData" :options="chartOptions"></line-chart>
          <b-alert v-else show variant="warning" class="w-25">{{ alertText }}</b-alert>
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
  name: "Volts",

  components: {
    datePicker,
    LineChart,
  },
  data() {
    return {
      table: "Volts",

      startDate: moment().format("YYYY-MM-DD 00:00:00"), // "2020-02-02 02:29:30"
      // .subtract(1, "days")

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
              return "  " + label + " : " + tooltipItem.yLabel.toFixed(2) + " V";
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
                // beginAtZero: true
              },
            },
          ],
          xAxes: [
            {
              type: "time",
              // distribution: "series",
              distribution: "series",
              time: {
                parser: "YYYY-MM-DD HH:mm:ss",
                unit: "day",
                displayFormats: { year: "DD MMM YYYY HH:mm", month: "DD MMM YYYY HH:mm", day: "DD MMM YYYY HH:mm", hour: "DD MMM YYYY HH:mm" },
              },
              offset: true,
              ticks: { stepSize: 5, maxTicksLimit: 48, fontStyle: "bold" },
            },
          ],
        },
      },
    };
  },
  mounted() {
    uibuilder.onChange("msg", (json) => {
      if (json.cmd == "chartVolts") {
        console.info("Msg received from Node-RED server in Volts:", json);
        this.chartData = json.payload;

        this.loaded = true;

         // FILTER DATA BASED ON DEVICE 
        // let arr = json.payload.datasets
        // let result = arr.filter( dev => dev.label.startsWith("Air Chiller 1"))
        // console.log("reslult filyer", result)
        // this.chartData = {}
        // this.chartData = {datasets: [...result], labels: [...json.payload.labels]}

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
        cmd: "chartVolts",
        payload: {
          table: this.table,
          startDate: moment(this.startDate).format("YYYY-MM-DD 00:00:00"),
          endDate: moment(this.startDate).format("YYYY-MM-DD 24:00:00"),
        },
      });
      console.log("Message sent from Volts:", this.msgSent);
    },

    downloadCSV() {
      let startDate = moment(this.startDate).format("YYYY-MM-DD 00:00:00");
      let endDate = moment(this.startDate).format("YYYY-MM-DD 24:00:00");
      let cmd = "csvVolts";

      let url = `http://${window.location.host}/csv?startDate=${startDate}&endDate=${endDate}&cmd=${cmd}&table=${this.table}`;
      console.log(url);
      // window.open(url, "_blank");
      window.location.assign(url);
    },

    chartToggleAll() {

     // console.log(this.$children[1]._data._chart);
    
      let chartId = this.$children[1]._data._chart.id
      this.$children[1]._data._chart.data.datasets.forEach(d => { d._meta[chartId].hidden = !d._meta[chartId].hidden;})
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

/deep/ .container {
  padding-right: 0px !important;
}

</style>
