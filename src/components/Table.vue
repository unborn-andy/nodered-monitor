<template>
  <div class="container ml-2">
    <div class="row justify-content-start p-2 ml-5 mt-5">
      <b-form-group label="Select Temperatures" class="">
        <b-form-checkbox-group switches size="" v-model="selectedCheckboxes" :options="checkboxOptions" value-field="item" text-field="name" disabled-field="notEnabled"></b-form-checkbox-group>
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
      <div v-if="loadingTable" class="col-md-10 mt-5 ml-5 text-center">
        <br />
        <br />
        <br />
        <b-spinner v-for="index in 3" style="width: 6rem; height: 6rem;" variant="primary" type="grow" :key="index"></b-spinner>
      </div>
      <div class="col-md-10 mt-2 ml-2" v-else-if="items.length > 0 && selectedCheckboxes.length > 0">
        <b-table class="h-80" hover sort-icon-left sticky-header small :items="items" :fields="visibleFields" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :current-page="currentPage" :per-page="perPage"></b-table>
        <b-pagination :total-rows="items.length" :per-page="perPage" v-model="currentPage" />
      </div>
      <div v-else-if="items.length > 0 && selectedCheckboxes.length == 0" class="col-md-8 mt-5 ml-5"><b-alert show variant="warning">Select at least one Temperature</b-alert></div>
      <div v-else class="col-md-6 mt-5 ml-2"><b-alert show variant="warning">Select at a different time range</b-alert></div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

// Import this component
import datePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";

module.exports = {
  name: "Table",
  components: {
    datePicker,
  },
  data() {
    return {
      selectedCheckboxes: ["TS04", "TS07"],
      checkboxOptions: [
        // { item: "dt", name: "Datetime" },
        { item: "TS04", name: "House Temperature" },
        { item: "TS07", name: "Water Temperature" },
        { item: "TS01", name: "Temp 01", notEnabled: true },
        { item: "TS02", name: "Temp 02", notEnabled: true },
      ],
      startDate: moment()
        .subtract(1, "days")
        .format("YYYY-MM-DD 00:00:00"), // "2020-02-02 02:29:30"
      endDate: moment().format("YYYY-MM-DD HH:mm:ss"), // "2020-02-02 02:50:30"
      // dateOptions: {
      //   format: "YYYY-MM-DD HH:mm:ss",
      //   useCurrent: false,
      // },
      msgSent: "",
      sortBy: "datetime",
      sortDesc: true,
      currentPage: 1,
      perPage: 12,
      // fields: [
      //   { key: "datetime", visible: true, sortable: true },
      //   { key: "Spitoui_Temperature", visible: true, sortable: true },
      //   { key: "water_Temperature", visible: true, sortable: true },
      //   { key: "no value test", visible: true, sortable: false }
      // ],
      loadingTable: false,
      items: [],
    };
  },

  methods: {
    // setDates() {
    //   //reset start end Dates from datetime pickers
    //   this.startDate = $("#datetimepicker6")
    //     .data("DateTimePicker")
    //     .date()
    //     .format("YYYY-MM-DD HH:mm:ss");

    //   this.endDate = $("#datetimepicker7")
    //     .data("DateTimePicker")
    //     .date()
    //     .format("YYYY-MM-DD HH:mm:ss");
    // },
    requestData() {
      this.items = [];
      //this.setDates;

      uibuilder.send({
        topic: "table",
        payload: {
          startDate: this.startDate,
          endDate: this.endDate,
          selectedCheckboxes: this.selectedCheckboxes,
        },
      });
      console.log("Message sent from Table:", this.msgSent.payload);
      this.loadingTable = true;
    },
  },

  // computed
  computed: {
    visibleFields() {
      let newFields = [];
      newFields = [{ key: "dt", label: "Date time", visible: true, sortable: true }];

      this.selectedCheckboxes.forEach((value) => {
        //  console.log(value);
        newFields.push({ key: value, visible: true, sortable: true });
      });
      return newFields;
    },
  },
  // watch
  // watch: {
  //   selectedCheckboxes() {
  //     this.selectedCheckboxes.length <= 1 ? (this.tableHide = true) : (this.checkboxDisabled = false);
  //   }
  // },
  // mounted
  mounted: function() {
    let vueApp = this;
    // uibuilder.start('http://localhost:1880/test', '/uibuilder/vendor/socket.io');

    uibuilder.onChange("msg", function(msg) {
      if (msg.topic == "table" && msg.payload.length > 0) {
        console.info("Msg received from Node-RED server in Table:", msg);
        vueApp.items = msg.payload;

        vueApp.loadingTable = false;
      } else {
        vueApp.loadingTable = false;
      }
    });

    // If a message is sent back to Node-RED, we can grab a copy here if we want to
    uibuilder.onChange("sentMsg", function(newVal) {
      //console.info('[indexjs:uibuilder.onChange:sentMsg] msg sent to Node-RED server:', newVal)
      vueApp.msgSent = newVal;
    });

    setTimeout(function() {
      vueApp.requestData(); // request data on mount
    }, 3000);
  },

  //  beforeDestroy() {
  //   // It destroy the component

  //       console.log('Table comp destroyed?', uibuilder.get("msg") )
  // }
};
</script>

<style scoped>
.b-table-sticky-header {
  /* overflow-y: auto; */
  max-height: 500px;
}
</style>
