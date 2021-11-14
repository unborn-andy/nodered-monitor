<template>
  <div>
    <div class="container ml-2">
      <div class="row justify-content-start p-2 ml-5 mt-5">
        <b-form-group label="Select Temperatures" class="">
          <b-form-checkbox-group switches @change="requestData()" size="" v-model="selectedCheckboxes" :options="checkboxOptions" value-field="item" text-field="name" disabled-field="notEnabled"></b-form-checkbox-group>
        </b-form-group>
      </div>
      <div class="row justify-content-start p-2 ml-5">
        <div class="col-md-3">
          <label for="datepicker1">Select Start Date :</label>
          <b-input-group size="sm" class="mb-2">
            <date-picker v-model="startDate" format="YYYY-MM-DD HH:mm:ss" valueType="format" type="datetime"></date-picker>
          </b-input-group>
        </div>
        <div class="col-md-3">
          <label for="datepicker1">Select End Date :</label>
          <b-input-group size="sm" class="mb-2">
            <date-picker v-model="endDate" format="YYYY-MM-DD HH:mm:ss" valueType="format" type="datetime"></date-picker>
          </b-input-group>
        </div>
        <div class="col-md-2 mt-3 align-self-center">
          <button id="btnAjax" type="button" class="btn btn-primary btn-sm" @click="requestData()">Redraw Table</button>
        </div>
      </div>
      <div class="row justify-content-start p-2 ml-5">
        <!-- <div v-if="loadingChart" class="col-md-10 mt-5 ml-5 text-center">
          <br />
          <br />
          <br />
          <b-spinner v-for="index in 3" style="width: 6rem; height: 6rem;" variant="primary" type="grow" :key="index"></b-spinner>
        </div>
        <div v-else-if="chartData.length > 0 && selectedCheckboxes.length == 0" class="col-md-8 mt-5 ml-5">
          <b-alert show variant="warning">Select at least one Temperature</b-alert>
        </div>
        <div v-else-if="chartData.length == 0" class="col-md-6 mt-5 ml-2"><b-alert show variant="warning">Select at a different time range</b-alert></div>
        <div class="myChart col-8 mt-5 ml-2" v-show="chartData.length > 0 && selectedCheckboxes.length > 0">
          <highcharts :options="chartOptions"></highcharts>
        </div> -->
        <highcharts :options="chartOptions"></highcharts>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

import { Chart } from "highcharts-vue";

// Import this component
import datePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";

module.exports = {
  name: "HighChart",
  // extends: Line,
  components: {
    datePicker,
    highcharts: Chart,
  },
  data() {
    return {
      // chart: null,
      selectedCheckboxes: ["Spitoui_Temperature", "water_Temperature"],
      checkboxOptions: [
        { item: "Spitoui_Temperature", name: "Spitoui Temperature" },
        { item: "water_Temperature", name: "Water Temperature" },
        { item: "3", name: "Temp 03", notEnabled: true },
        { item: "4", name: "Temp 04", notEnabled: true },
      ],
      startDate: moment()
        .subtract(1, "days")
        .format("YYYY-MM-DD 00:00:00"), // "2020-02-02 02:29:30"
      endDate: moment().format("YYYY-MM-DD HH:mm:ss"), // "2020-02-02 02:50:30"

      msgSent: "",
      loadingChart: false,

      chartOptions: {
        title: {
          text: "Solar Employment Growth by Sector, 2010-2016",
        },

        subtitle: {
          text: "Source: thesolarfoundation.com",
        },

        yAxis: {
          title: {
            text: "Number of Employees",
          },
        },

        xAxis: {
          accessibility: {
            rangeDescription: "Range: 2010 to 2017",
          },
        },

        legend: {
          layout: "vertical",
          align: "right",
          verticalAlign: "middle",
        },

        plotOptions: {
          series: {
            label: {
              connectorAllowed: false,
            },
            pointStart: 2010,
          },
        },

        series: [
          {
            name: "Installation",
            data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175],
          },
          {
            name: "Manufacturing",
            data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434],
          },
          {
            name: "Sales & Distribution",
            data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387],
          },
          {
            name: "Project Development",
            data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227],
          },
          {
            name: "Other",
            data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111],
          },
        ],

        responsive: {
          rules: [
            {
              condition: {
                maxWidth: 500,
              },
              chartOptions: {
                legend: {
                  layout: "horizontal",
                  align: "center",
                  verticalAlign: "bottom",
                },
              },
            },
          ],
        },
      },
    };
  },
  created() {
    let vueApp = this;
    // uibuilder.start('http://localhost:1880/test', '/uibuilder/vendor/socket.io');

    uibuilder.onChange("msg", function(json) {
      console.info("Msg received from Node-RED server in Chart:", json);
      if (json.topic == "find_db" && json.payload.length > 0) {
        //  vueApp.chartData.datasets = [];
        // vueApp.chartData.labels = [];
        // set chart labels
        json.payload.forEach((el) => {
          // vueApp.chartData.push(el.dt);
        });
        // set chart data

        vueApp.loadingChart = false;

        //vueApp.drawChart();
      } else {
        vueApp.loadingChart = false;
      }
    });

    // If a message is sent back to Node-RED, we can grab a copy here if we want to
    uibuilder.onChange("sentMsg", function(newVal) {
      //console.info('[indexjs:uibuilder.onChange:sentMsg] msg sent to Node-RED server:', newVal)
      vueApp.msgSent = newVal;
    });
  },

  methods: {
    requestData() {
      this.loadingChart = true;

      uibuilder.send({
        topic: "find_db",
        payload: {
          startDate: this.startDate + " 00:00:00",
          endDate: this.endDate + " 24:00:00",
          selectedCheckboxes: this.selectedCheckboxes,
        },
      });
      console.log("Message sent from Chart:", this.msgSent.payload);
    },
  },
};
</script>

<style scoped></style>
