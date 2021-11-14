<template lang="html">
  <b-container fluid class="pr-5">
    <h2 class="ml-4 mt-4">Overview</h2>

    <b-row align-h="start" class="ml-4 mt-4">
      <b-alert :variant="status.status_31 == 'Connected' ? 'success' : 'danger'" show>
        <b-icon icon="broadcast" class="mr-2"></b-icon>
        METER A : {{ status.status_31 }}
      </b-alert>
      <b-alert :variant="status.status_32 == 'Connected' ? 'success' : 'danger'" show>
        <b-icon icon="broadcast" class="mr-2"></b-icon>
        METER B : {{ status.status_32 }}
      </b-alert>
      <!-- <b-alert :variant="status.status_33 == 'Connected' ? 'success' : 'danger'" show>
        <b-icon icon="broadcast" class="mr-2"></b-icon>
        Heat Pump Hot Water 1 : {{ status.status_33 }}
      </b-alert>
      <b-alert :variant="status.status_34 == 'Connected' ? 'success' : 'danger'" show>
        <b-icon icon="broadcast" class="mr-2"></b-icon>
        Heat Pump Hot Water 2 : {{ status.status_34 }}
      </b-alert>
      <b-alert :variant="status.status_35 == 'Connected' ? 'success' : 'danger'" show>
        <b-icon icon="broadcast" class="mr-2"></b-icon>
        Heat Pump Cold Water 1 : {{ status.status_35 }}
      </b-alert>
      <b-alert :variant="status.status_36 == 'Connected' ? 'success' : 'danger'" show>
        <b-icon icon="broadcast" class="mr-2"></b-icon>
        Heat Pump Cold Water 2 : {{ status.status_36 }}
      </b-alert> -->
    </b-row>

    <b-row align-v="end" class="ml-4 mt-1">
      <b-col cols="12">
        <h5 class="mt-2 mb-4">
          <strong>
            Last realtime values received from devices :
            <span class="ml-2 mr-5 clock">
              <b-icon v-if="time" class="mr-2" icon="clock"></b-icon>
              {{ time }}
            </span>
            Available storage :
            <span class="ml-2 freespace">
              <b-icon v-if="freeSpace" class="mr-2" icon="file-earmark-text"></b-icon>
              {{ freeSpace }}
            </span>
          </strong>
        </h5>

        <b-form-select v-model="selectedDevice" :options="options" class="mb-4 w-25" size="sm"></b-form-select>

        <b-table v-if="selectedDevice == '31' && items_31.length > 0" :items="items_31" :fields="fields_31" responsive sticky-header="500px" small outlined striped hover sortBy="dt" :sort-desc="true"></b-table>
        <b-card v-if="items_31.length == 0" title="Loading device status and table data ...">
          <b-skeleton animation="wave" width="85%"></b-skeleton>
          <b-skeleton animation="wave" width="55%"></b-skeleton>
          <b-skeleton animation="wave" width="70%"></b-skeleton>
        </b-card>
        <b-table v-if="selectedDevice == '32' && items_32.length > 0" :items="items_32" :fields="fields_32" responsive sticky-header="500px" small outlined striped hover sortBy="dt" :sort-desc="true"></b-table>
        <b-table v-if="selectedDevice == '33' && items_33.length > 0" :items="items_33" :fields="fields_33" responsive sticky-header="500px" small outlined striped hover sortBy="dt" :sort-desc="true"></b-table>
        <!-- <b-table v-if="selectedDevice == '34' && items_34.length > 0" :items="items_34" :fields="fields_34" responsive sticky-header="500px" small outlined striped hover sortBy="dt" :sort-desc="true"></b-table>
        <b-table v-if="selectedDevice == '35' && items_35.length > 0" :items="items_35" :fields="fields_35" responsive sticky-header="500px" small outlined striped hover sortBy="dt" :sort-desc="true"></b-table>
        <b-table v-if="selectedDevice == '36' && items_36.length > 0" :items="items_36" :fields="fields_36" responsive sticky-header="500px" small outlined striped hover sortBy="dt" :sort-desc="true"></b-table> -->
      </b-col>
    </b-row>

    <b-row class="ml-4 mt-2 mb-2">
      <b-col cols="12">
        <h5><strong>Last realtime total Energy (kWh) received from devices :</strong></h5>
      </b-col>
    </b-row>
    <b-row align-h="start" class="ml-4 mt-2">
      <b-alert :variant="status.status_31 == 'Connected' ? 'warning' : 'danger'" show>
        <b-icon icon="broadcast" class="mr-2"></b-icon>
        METER A : {{ items_31.length > 0 ? items_31[items_31.length - 1].EI_31_T + " kWh" : "" }} 
      </b-alert>
      <b-alert :variant="status.status_32 == 'Connected' ? 'warning' : 'danger'" show>
        <b-icon icon="broadcast" class="mr-2"></b-icon>
        METER B : {{ items_32.length > 0 ? items_32[items_32.length - 1].EI_32_T + " kWh" : "" }} 
      </b-alert>
      <!-- <b-alert :variant="status.status_33 == 'Connected' ? 'warning' : 'danger'" show>
        <b-icon icon="broadcast" class="mr-2"></b-icon>
        Heat Pump Hot Water 1 : {{ items_33.length > 0 ? items_33[items_33.length - 1].EI_33_T + " kWh" : "" }} 
      </b-alert>
      <b-alert :variant="status.status_34 == 'Connected' ? 'warning' : 'danger'" show>
        <b-icon icon="broadcast" class="mr-2"></b-icon>
        Heat Pump Hot Water 2 : {{ items_34.length > 0 ? items_34[items_34.length - 1].EI_34_T + " kWh" : "" }} 
      </b-alert>
      <b-alert :variant="status.status_35 == 'Connected' ? 'warning' : 'danger'" show>
        <b-icon icon="broadcast" class="mr-2"></b-icon>
        Heat Pump Cold Water 1 : {{ items_35.length > 0 ? items_35[items_35.length - 1].EI_35_T + " kWh" : "" }} 
      </b-alert>
      <b-alert :variant="status.status_36 == 'Connected' ? 'warning' : 'danger'" show>
        <b-icon icon="broadcast" class="mr-2"></b-icon>
        Heat Pump Cold Water 2 : {{ items_36.length > 0 ? items_36[items_36.length - 1].EI_36_T + " kWh" : "" }} 
      </b-alert> -->
    </b-row>
  </b-container>
</template>

<script>
import moment from "moment";

export default {
  name: "overview",
  data() {
    return {
      // msg: "No Message Received from Node-Red",
      time: "",
      freeSpace: "",
      status: {},
      selectedDevice: "31",
      options: [
        { value: "31", text: "METER A" },
        { value: "32", text: "METER B" },
        // { value: "33", text: "Heat Pump Hot Water 1" },
        // { value: "34", text: "Heat Pump Hot Water 2" },
        // { value: "35", text: "Heat Pump Cold Water 1" },
        // { value: "36", text: "Heat Pump Cold Water 2" },
      ],
      fields_31: [
        {
          key: "dt",
          label: "Date Time",
          sortable: true,
        },
        {
          key: "V_31_L1",
          label: "Voltage L1 (V)",
          sortable: false,
        },
        {
          key: "V_31_L2",
          label: "Voltage L2 (V)",
          sortable: false,
        },
        {
          key: "V_31_L3",
          label: "Voltage L3 (V)",
          sortable: false,
          //variant: "danger",
        },
        {
          key: "A_31_L1",
          label: "Current L1 (A)",
          sortable: false,
        },
        {
          key: "A_31_L2",
          label: "Current L2 (A)",
          sortable: false,
        },
        {
          key: "A_31_L3",
          label: "Current L3 (A)",
          sortable: false,
          //variant: "danger",
        },
        {
          key: "F_31_L1",
          label: "Frequency L1 (Hz)",
          sortable: false,
        },
        {
          key: "F_31_L2",
          label: "Frequency L2 (Hz)",
          sortable: false,
        },
        {
          key: "F_31_L3",
          label: "Frequency L3 (Hz)",
          sortable: false,
          //variant: "danger",
        },
        {
          key: "PF_31_L1",
          label: "Power Factor L1",
          sortable: false,
        },
        {
          key: "PF_31_L2",
          label: "Power Factor L2",
          sortable: false,
        },
        {
          key: "PF_31_L3",
          label: "Power Factor L3",
          sortable: false,
          //variant: "danger",
        },
        {
          key: "THDV_31_L1",
          label: "THD Volt L1",
          sortable: false,
        },
        {
          key: "THDV_31_L2",
          label: "THD Volt L2",
          sortable: false,
        },
        {
          key: "THDV_31_L3",
          label: "THD Volt L3",
          sortable: false,
          //variant: "danger",
        },
        {
          key: "THDA_31_L1",
          label: "THD Current L1",
          sortable: false,
        },
        {
          key: "THDA_31_L2",
          label: "THD Current L2",
          sortable: false,
        },
        {
          key: "THDA_31_L3",
          label: "THD Current L3",
          sortable: false,
          //variant: "danger",
        },
        {
          key: "P_31_L1",
          label: "Power L1 (W)",
          sortable: false,
        },
        {
          key: "P_31_L2",
          label: "Power L2 (W)",
          sortable: false,
        },
        {
          key: "P_31_L3",
          label: "Power L3 (W)",
          sortable: false,
          //variant: "danger",
        },
        {
          key: "P_31_T",
          label: "Power Total (W)",
          sortable: false,
        },
        {
          key: "Q_31_T",
          label: "Reactive Total (VAr)",
          sortable: false,
        },
        {
          key: "S_31_T",
          label: "Apparent Power Total (VA)",
          sortable: false,
          //variant: "danger",
        },
        {
          key: "EI_31_L1",
          label: "Energy L1 (kWh)",
          sortable: false,
        },
        {
          key: "EI_31_L2",
          label: "Energy L2 (kWh)",
          sortable: false,
        },
        {
          key: "EI_31_L3",
          label: "Energy L3 (kWh)",
          sortable: false,
          //variant: "danger",
        },
        {
          key: "EI_31_T",
          label: "Energy Total (kWh)",
          sortable: false,
        },
      ],
      fields_32: [
        {
          key: "dt",
          label: "Date Time",
          sortable: true,
        },
        {
          key: "V_32_L1",
          label: "Voltage L1 (V)",
          sortable: false,
        },
        {
          key: "V_32_L2",
          label: "Voltage L2 (V)",
          sortable: false,
        },
        {
          key: "V_32_L3",
          label: "Voltage L3 (V)",
          sortable: false,
          //variant: "danger",
        },
        {
          key: "A_32_L1",
          label: "Current L1 (A)",
          sortable: false,
        },
        {
          key: "A_32_L2",
          label: "Current L2 (A)",
          sortable: false,
        },
        {
          key: "A_32_L3",
          label: "Current L3 (A)",
          sortable: false,
          //variant: "danger",
        },
        {
          key: "F_32_L1",
          label: "Frequency L1 (Hz)",
          sortable: false,
        },
        {
          key: "F_32_L2",
          label: "Frequency L2 (Hz)",
          sortable: false,
        },
        {
          key: "F_32_L3",
          label: "Frequency L3 (Hz)",
          sortable: false,
          //variant: "danger",
        },
        {
          key: "PF_32_L1",
          label: "Power Factor L1",
          sortable: false,
        },
        {
          key: "PF_32_L2",
          label: "Power Factor L2",
          sortable: false,
        },
        {
          key: "PF_32_L3",
          label: "Power Factor L3",
          sortable: false,
          //variant: "danger",
        },
        {
          key: "THDV_32_L1",
          label: "THD Volt L1",
          sortable: false,
        },
        {
          key: "THDV_32_L2",
          label: "THD Volt L2",
          sortable: false,
        },
        {
          key: "THDV_32_L3",
          label: "THD Volt L3",
          sortable: false,
          //variant: "danger",
        },
        {
          key: "THDA_32_L1",
          label: "THD Current L1",
          sortable: false,
        },
        {
          key: "THDA_32_L2",
          label: "THD Current L2",
          sortable: false,
        },
        {
          key: "THDA_32_L3",
          label: "THD Current L3",
          sortable: false,
          //variant: "danger",
        },
        {
          key: "P_32_L1",
          label: "Power L1 (W)",
          sortable: false,
        },
        {
          key: "P_32_L2",
          label: "Power L2 (W)",
          sortable: false,
        },
        {
          key: "P_32_L3",
          label: "Power L3 (W)",
          sortable: false,
          //variant: "danger",
        },
        {
          key: "P_32_T",
          label: "Power Total (W)",
          sortable: false,
        },
        {
          key: "Q_32_T",
          label: "Reactive Total (VAr)",
          sortable: false,
        },
        {
          key: "S_32_T",
          label: "Apparent Power Total (VA)",
          sortable: false,
          //variant: "danger",
        },
        {
          key: "EI_32_L1",
          label: "Energy L1 (kWh)",
          sortable: false,
        },
        {
          key: "EI_32_L2",
          label: "Energy L2 (kWh)",
          sortable: false,
        },
        {
          key: "EI_32_L3",
          label: "Energy L3 (kWh)",
          sortable: false,
          //variant: "danger",
        },
        {
          key: "EI_32_T",
          label: "Energy Total (kWh)",
          sortable: false,
        },
      ],
      // fields_33: [
      //   {
      //     key: "dt",
      //     label: "Date Time",
      //     sortable: true,
      //   },
      //   {
      //     key: "V_33_L1",
      //     label: "Voltage L1 (V)",
      //     sortable: false,
      //   },
      //   {
      //     key: "V_33_L2",
      //     label: "Voltage L2 (V)",
      //     sortable: false,
      //   },
      //   {
      //     key: "V_33_L3",
      //     label: "Voltage L3 (V)",
      //     sortable: false,
      //     //variant: "danger",
      //   },
      //   {
      //     key: "A_33_L1",
      //     label: "Current L1 (A)",
      //     sortable: false,
      //   },
      //   {
      //     key: "A_33_L2",
      //     label: "Current L2 (A)",
      //     sortable: false,
      //   },
      //   {
      //     key: "A_33_L3",
      //     label: "Current L3 (A)",
      //     sortable: false,
      //     //variant: "danger",
      //   },
      //   {
      //     key: "F_33_L1",
      //     label: "Frequency L1 (Hz)",
      //     sortable: false,
      //   },
      //   {
      //     key: "F_33_L2",
      //     label: "Frequency L2 (Hz)",
      //     sortable: false,
      //   },
      //   {
      //     key: "F_33_L3",
      //     label: "Frequency L3 (Hz)",
      //     sortable: false,
      //     //variant: "danger",
      //   },
      //   {
      //     key: "PF_33_L1",
      //     label: "Power Factor L1",
      //     sortable: false,
      //   },
      //   {
      //     key: "PF_33_L2",
      //     label: "Power Factor L2",
      //     sortable: false,
      //   },
      //   {
      //     key: "PF_33_L3",
      //     label: "Power Factor L3",
      //     sortable: false,
      //     //variant: "danger",
      //   },
      //   {
      //     key: "THDV_33_L1",
      //     label: "THD Volt L1",
      //     sortable: false,
      //   },
      //   {
      //     key: "THDV_33_L2",
      //     label: "THD Volt L2",
      //     sortable: false,
      //   },
      //   {
      //     key: "THDV_33_L3",
      //     label: "THD Volt L3",
      //     sortable: false,
      //     //variant: "danger",
      //   },
      //   {
      //     key: "THDA_33_L1",
      //     label: "THD Current L1",
      //     sortable: false,
      //   },
      //   {
      //     key: "THDA_33_L2",
      //     label: "THD Current L2",
      //     sortable: false,
      //   },
      //   {
      //     key: "THDA_33_L3",
      //     label: "THD Current L3",
      //     sortable: false,
      //     //variant: "danger",
      //   },
      //   {
      //     key: "P_33_L1",
      //     label: "Power L1 (W)",
      //     sortable: false,
      //   },
      //   {
      //     key: "P_33_L2",
      //     label: "Power L2 (W)",
      //     sortable: false,
      //   },
      //   {
      //     key: "P_33_L3",
      //     label: "Power L3 (W)",
      //     sortable: false,
      //     //variant: "danger",
      //   },
      //   {
      //     key: "P_33_T",
      //     label: "Power Total (W)",
      //     sortable: false,
      //   },
      //   {
      //     key: "Q_33_T",
      //     label: "Reactive Total (VAr)",
      //     sortable: false,
      //   },
      //   {
      //     key: "S_33_T",
      //     label: "Apparent Power Total (VA)",
      //     sortable: false,
      //     //variant: "danger",
      //   },
      //   {
      //     key: "EI_33_L1",
      //     label: "Energy L1 (kWh)",
      //     sortable: false,
      //   },
      //   {
      //     key: "EI_33_L2",
      //     label: "Energy L2 (kWh)",
      //     sortable: false,
      //   },
      //   {
      //     key: "EI_33_L3",
      //     label: "Energy L3 (kWh)",
      //     sortable: false,
      //     //variant: "danger",
      //   },
      //   {
      //     key: "EI_33_T",
      //     label: "Energy Total (kWh)",
      //     sortable: false,
      //   },
      // ],
      // fields_34: [
      //   {
      //     key: "dt",
      //     label: "Date Time",
      //     sortable: true,
      //   },
      //   {
      //     key: "V_34_L1",
      //     label: "Voltage L1 (V)",
      //     sortable: false,
      //   },
      //   {
      //     key: "V_34_L2",
      //     label: "Voltage L2 (V)",
      //     sortable: false,
      //   },
      //   {
      //     key: "V_34_L3",
      //     label: "Voltage L3 (V)",
      //     sortable: false,
      //     //variant: "danger",
      //   },
      //   {
      //     key: "A_34_L1",
      //     label: "Current L1 (A)",
      //     sortable: false,
      //   },
      //   {
      //     key: "A_34_L2",
      //     label: "Current L2 (A)",
      //     sortable: false,
      //   },
      //   {
      //     key: "A_34_L3",
      //     label: "Current L3 (A)",
      //     sortable: false,
      //     //variant: "danger",
      //   },
      //   {
      //     key: "F_34_L1",
      //     label: "Frequency L1 (Hz)",
      //     sortable: false,
      //   },
      //   {
      //     key: "F_34_L2",
      //     label: "Frequency L2 (Hz)",
      //     sortable: false,
      //   },
      //   {
      //     key: "F_34_L3",
      //     label: "Frequency L3 (Hz)",
      //     sortable: false,
      //     //variant: "danger",
      //   },
      //   {
      //     key: "PF_34_L1",
      //     label: "Power Factor L1",
      //     sortable: false,
      //   },
      //   {
      //     key: "PF_34_L2",
      //     label: "Power Factor L2",
      //     sortable: false,
      //   },
      //   {
      //     key: "PF_34_L3",
      //     label: "Power Factor L3",
      //     sortable: false,
      //     //variant: "danger",
      //   },
      //   {
      //     key: "THDV_34_L1",
      //     label: "THD Volt L1",
      //     sortable: false,
      //   },
      //   {
      //     key: "THDV_34_L2",
      //     label: "THD Volt L2",
      //     sortable: false,
      //   },
      //   {
      //     key: "THDV_34_L3",
      //     label: "THD Volt L3",
      //     sortable: false,
      //     //variant: "danger",
      //   },
      //   {
      //     key: "THDA_34_L1",
      //     label: "THD Current L1",
      //     sortable: false,
      //   },
      //   {
      //     key: "THDA_34_L2",
      //     label: "THD Current L2",
      //     sortable: false,
      //   },
      //   {
      //     key: "THDA_34_L3",
      //     label: "THD Current L3",
      //     sortable: false,
      //     //variant: "danger",
      //   },
      //   {
      //     key: "P_34_L1",
      //     label: "Power L1 (W)",
      //     sortable: false,
      //   },
      //   {
      //     key: "P_34_L2",
      //     label: "Power L2 (W)",
      //     sortable: false,
      //   },
      //   {
      //     key: "P_34_L3",
      //     label: "Power L3 (W)",
      //     sortable: false,
      //     //variant: "danger",
      //   },
      //   {
      //     key: "P_34_T",
      //     label: "Power Total (W)",
      //     sortable: false,
      //   },
      //   {
      //     key: "Q_34_T",
      //     label: "Reactive Total (VAr)",
      //     sortable: false,
      //   },
      //   {
      //     key: "S_34_T",
      //     label: "Apparent Power Total (VA)",
      //     sortable: false,
      //     //variant: "danger",
      //   },
      //   {
      //     key: "EI_34_L1",
      //     label: "Energy L1 (kWh)",
      //     sortable: false,
      //   },
      //   {
      //     key: "EI_34_L2",
      //     label: "Energy L2 (kWh)",
      //     sortable: false,
      //   },
      //   {
      //     key: "EI_34_L3",
      //     label: "Energy L3 (kWh)",
      //     sortable: false,
      //     //variant: "danger",
      //   },
      //   {
      //     key: "EI_34_T",
      //     label: "Energy Total (kWh)",
      //     sortable: false,
      //   },
      // ],
      // fields_35: [
      //   {
      //     key: "dt",
      //     label: "Date Time",
      //     sortable: true,
      //   },
      //   {
      //     key: "V_35_L1",
      //     label: "Voltage L1 (V)",
      //     sortable: false,
      //   },
      //   {
      //     key: "V_35_L2",
      //     label: "Voltage L2 (V)",
      //     sortable: false,
      //   },
      //   {
      //     key: "V_35_L3",
      //     label: "Voltage L3 (V)",
      //     sortable: false,
      //     //variant: "danger",
      //   },
      //   {
      //     key: "A_35_L1",
      //     label: "Current L1 (A)",
      //     sortable: false,
      //   },
      //   {
      //     key: "A_35_L2",
      //     label: "Current L2 (A)",
      //     sortable: false,
      //   },
      //   {
      //     key: "A_35_L3",
      //     label: "Current L3 (A)",
      //     sortable: false,
      //     //variant: "danger",
      //   },
      //   {
      //     key: "F_35_L1",
      //     label: "Frequency L1 (Hz)",
      //     sortable: false,
      //   },
      //   {
      //     key: "F_35_L2",
      //     label: "Frequency L2 (Hz)",
      //     sortable: false,
      //   },
      //   {
      //     key: "F_35_L3",
      //     label: "Frequency L3 (Hz)",
      //     sortable: false,
      //     //variant: "danger",
      //   },
      //   {
      //     key: "PF_35_L1",
      //     label: "Power Factor L1",
      //     sortable: false,
      //   },
      //   {
      //     key: "PF_35_L2",
      //     label: "Power Factor L2",
      //     sortable: false,
      //   },
      //   {
      //     key: "PF_35_L3",
      //     label: "Power Factor L3",
      //     sortable: false,
      //     //variant: "danger",
      //   },
      //   {
      //     key: "THDV_35_L1",
      //     label: "THD Volt L1",
      //     sortable: false,
      //   },
      //   {
      //     key: "THDV_35_L2",
      //     label: "THD Volt L2",
      //     sortable: false,
      //   },
      //   {
      //     key: "THDV_35_L3",
      //     label: "THD Volt L3",
      //     sortable: false,
      //     //variant: "danger",
      //   },
      //   {
      //     key: "THDA_35_L1",
      //     label: "THD Current L1",
      //     sortable: false,
      //   },
      //   {
      //     key: "THDA_35_L2",
      //     label: "THD Current L2",
      //     sortable: false,
      //   },
      //   {
      //     key: "THDA_35_L3",
      //     label: "THD Current L3",
      //     sortable: false,
      //     //variant: "danger",
      //   },
      //   {
      //     key: "P_35_L1",
      //     label: "Power L1 (W)",
      //     sortable: false,
      //   },
      //   {
      //     key: "P_35_L2",
      //     label: "Power L2 (W)",
      //     sortable: false,
      //   },
      //   {
      //     key: "P_35_L3",
      //     label: "Power L3 (W)",
      //     sortable: false,
      //     //variant: "danger",
      //   },
      //   {
      //     key: "P_35_T",
      //     label: "Power Total (W)",
      //     sortable: false,
      //   },
      //   {
      //     key: "Q_35_T",
      //     label: "Reactive Total (VAr)",
      //     sortable: false,
      //   },
      //   {
      //     key: "S_35_T",
      //     label: "Apparent Power Total (VA)",
      //     sortable: false,
      //     //variant: "danger",
      //   },
      //   {
      //     key: "EI_35_L1",
      //     label: "Energy L1 (kWh)",
      //     sortable: false,
      //   },
      //   {
      //     key: "EI_35_L2",
      //     label: "Energy L2 (kWh)",
      //     sortable: false,
      //   },
      //   {
      //     key: "EI_35_L3",
      //     label: "Energy L3 (kWh)",
      //     sortable: false,
      //     //variant: "danger",
      //   },
      //   {
      //     key: "EI_35_T",
      //     label: "Energy Total (kWh)",
      //     sortable: false,
      //   },
      // ],
      // fields_36: [
      //   {
      //     key: "dt",
      //     label: "Date Time",
      //     sortable: true,
      //   },
      //   {
      //     key: "V_36_L1",
      //     label: "Voltage L1 (V)",
      //     sortable: false,
      //   },
      //   {
      //     key: "V_36_L2",
      //     label: "Voltage L2 (V)",
      //     sortable: false,
      //   },
      //   {
      //     key: "V_36_L3",
      //     label: "Voltage L3 (V)",
      //     sortable: false,
      //     //variant: "danger",
      //   },
      //   {
      //     key: "A_36_L1",
      //     label: "Current L1 (A)",
      //     sortable: false,
      //   },
      //   {
      //     key: "A_36_L2",
      //     label: "Current L2 (A)",
      //     sortable: false,
      //   },
      //   {
      //     key: "A_36_L3",
      //     label: "Current L3 (A)",
      //     sortable: false,
      //     //variant: "danger",
      //   },
      //   {
      //     key: "F_36_L1",
      //     label: "Frequency L1 (Hz)",
      //     sortable: false,
      //   },
      //   {
      //     key: "F_36_L2",
      //     label: "Frequency L2 (Hz)",
      //     sortable: false,
      //   },
      //   {
      //     key: "F_36_L3",
      //     label: "Frequency L3 (Hz)",
      //     sortable: false,
      //     //variant: "danger",
      //   },
      //   {
      //     key: "PF_36_L1",
      //     label: "Power Factor L1",
      //     sortable: false,
      //   },
      //   {
      //     key: "PF_36_L2",
      //     label: "Power Factor L2",
      //     sortable: false,
      //   },
      //   {
      //     key: "PF_36_L3",
      //     label: "Power Factor L3",
      //     sortable: false,
      //     //variant: "danger",
      //   },
      //   {
      //     key: "THDV_36_L1",
      //     label: "THD Volt L1",
      //     sortable: false,
      //   },
      //   {
      //     key: "THDV_36_L2",
      //     label: "THD Volt L2",
      //     sortable: false,
      //   },
      //   {
      //     key: "THDV_36_L3",
      //     label: "THD Volt L3",
      //     sortable: false,
      //     //variant: "danger",
      //   },
      //   {
      //     key: "THDA_36_L1",
      //     label: "THD Current L1",
      //     sortable: false,
      //   },
      //   {
      //     key: "THDA_36_L2",
      //     label: "THD Current L2",
      //     sortable: false,
      //   },
      //   {
      //     key: "THDA_36_L3",
      //     label: "THD Current L3",
      //     sortable: false,
      //     //variant: "danger",
      //   },
      //   {
      //     key: "P_36_L1",
      //     label: "Power L1 (W)",
      //     sortable: false,
      //   },
      //   {
      //     key: "P_36_L2",
      //     label: "Power L2 (W)",
      //     sortable: false,
      //   },
      //   {
      //     key: "P_36_L3",
      //     label: "Power L3 (W)",
      //     sortable: false,
      //     //variant: "danger",
      //   },
      //   {
      //     key: "P_36_T",
      //     label: "Power Total (W)",
      //     sortable: false,
      //   },
      //   {
      //     key: "Q_36_T",
      //     label: "Reactive Total (VAr)",
      //     sortable: false,
      //   },
      //   {
      //     key: "S_36_T",
      //     label: "Apparent Power Total (VA)",
      //     sortable: false,
      //     //variant: "danger",
      //   },
      //   {
      //     key: "EI_36_L1",
      //     label: "Energy L1 (kWh)",
      //     sortable: false,
      //   },
      //   {
      //     key: "EI_36_L2",
      //     label: "Energy L2 (kWh)",
      //     sortable: false,
      //   },
      //   {
      //     key: "EI_36_L3",
      //     label: "Energy L3 (kWh)",
      //     sortable: false,
      //     //variant: "danger",
      //   },
      //   {
      //     key: "EI_36_T",
      //     label: "Energy Total (kWh)",
      //     sortable: false,
      //   },
      // ],

      items_31: [],
      items_32: [],
      items_33: [],
      items_34: [],
      items_35: [],
      items_36: [],
    };
  },
  methods: {},

  mounted() {
    // setInterval(() => {
    //   this.clock = moment().format("YYYY-MM-DD HH:mm:ss");
    // }, 1000);

    uibuilder.onChange("msg", (json) => {
      if (json.cmd == "Overview") {

        console.info("Msg received from Node-RED server in Overview:", json);

        this.time = json.payload.dt;

        this.freeSpace = json.payload.freeSpace

        this.status = {
          status_31: json.payload.Status_31,
          status_32: json.payload.Status_32,
          status_33: json.payload.Status_33,
          status_34: json.payload.Status_34,
          status_35: json.payload.Status_35,
          status_36: json.payload.Status_36,
        };

        if (this.items_31.length >= 200) this.items_31.shift();
        if (json.payload.Status_31 === "Connected") {
          this.items_31.push({
            dt: json.payload.dt,
            V_31_L1: json.payload.V_31_L1.toFixed(2),
            V_31_L2: json.payload.V_31_L2.toFixed(2),
            V_31_L3: json.payload.V_31_L3.toFixed(2),
            A_31_L1: json.payload.A_31_L1.toFixed(2),
            A_31_L2: json.payload.A_31_L2.toFixed(2),
            A_31_L3: json.payload.A_31_L3.toFixed(2),

            P_31_L1: json.payload.P_31_L1.toFixed(2),
            P_31_L2: json.payload.P_31_L2.toFixed(2),
            P_31_L3: json.payload.P_31_L3.toFixed(2),
            P_31_T: json.payload.P_31_T.toFixed(2),
            Q_31_T: json.payload.Q_31_T.toFixed(2),
            S_31_T: json.payload.S_31_T.toFixed(2),

            PF_31_L1: json.payload.PF_31_L1.toFixed(2),
            PF_31_L2: json.payload.PF_31_L2.toFixed(2),
            PF_31_L3: json.payload.PF_31_L3.toFixed(2),
            F_31_L1: json.payload.F_31_L1.toFixed(2),
            F_31_L2: json.payload.F_31_L2.toFixed(2),
            F_31_L3: json.payload.F_31_L3.toFixed(2),

            THDV_31_L1: json.payload.THDV_31_L1.toFixed(2),
            THDV_31_L2: json.payload.THDV_31_L2.toFixed(2),
            THDV_31_L3: json.payload.THDV_31_L3.toFixed(2),
            THDA_31_L1: json.payload.THDA_31_L1.toFixed(2),
            THDA_31_L2: json.payload.THDA_31_L2.toFixed(2),
            THDA_31_L3: json.payload.THDA_31_L3.toFixed(2),

            EI_31_L1: json.payload.EI_31_L1.toFixed(2),
            EI_31_L2: json.payload.EI_31_L2.toFixed(2),
            EI_31_L3: json.payload.EI_31_L3.toFixed(2),
            EI_31_T: json.payload.EI_31_T.toFixed(2),
          });
        }

        if (this.items_32.length >= 200) this.items_32.shift();
        if (json.payload.Status_32 === "Connected") {
          this.items_32.push({
            dt: json.payload.dt,
            V_32_L1: json.payload.V_32_L1.toFixed(2),
            V_32_L2: json.payload.V_32_L2.toFixed(2),
            V_32_L3: json.payload.V_32_L3.toFixed(2),
            A_32_L1: json.payload.A_32_L1.toFixed(2),
            A_32_L2: json.payload.A_32_L2.toFixed(2),
            A_32_L3: json.payload.A_32_L3.toFixed(2),

            P_32_L1: json.payload.P_32_L1.toFixed(2),
            P_32_L2: json.payload.P_32_L2.toFixed(2),
            P_32_L3: json.payload.P_32_L3.toFixed(2),
            P_32_T: json.payload.P_32_T.toFixed(2),
            Q_32_T: json.payload.Q_32_T.toFixed(2),
            S_32_T: json.payload.S_32_T.toFixed(2),

            PF_32_L1: json.payload.PF_32_L1.toFixed(2),
            PF_32_L2: json.payload.PF_32_L2.toFixed(2),
            PF_32_L3: json.payload.PF_32_L3.toFixed(2),
            F_32_L1: json.payload.F_32_L1.toFixed(2),
            F_32_L2: json.payload.F_32_L2.toFixed(2),
            F_32_L3: json.payload.F_32_L3.toFixed(2),

            THDV_32_L1: json.payload.THDV_32_L1.toFixed(2),
            THDV_32_L2: json.payload.THDV_32_L2.toFixed(2),
            THDV_32_L3: json.payload.THDV_32_L3.toFixed(2),
            THDA_32_L1: json.payload.THDA_32_L1.toFixed(2),
            THDA_32_L2: json.payload.THDA_32_L2.toFixed(2),
            THDA_32_L3: json.payload.THDA_32_L3.toFixed(2),

            EI_32_L1: json.payload.EI_32_L1.toFixed(2),
            EI_32_L2: json.payload.EI_32_L2.toFixed(2),
            EI_32_L3: json.payload.EI_32_L3.toFixed(2),
            EI_32_T: json.payload.EI_32_T.toFixed(2),
          });
        }

        if (this.items_33.length >= 200) this.items_33.shift();
        if (json.payload.Status_33 === "Connected") {
          this.items_33.push({
            dt: json.payload.dt,
            V_33_L1: json.payload.V_33_L1.toFixed(2),
            V_33_L2: json.payload.V_33_L2.toFixed(2),
            V_33_L3: json.payload.V_33_L3.toFixed(2),
            A_33_L1: json.payload.A_33_L1.toFixed(2),
            A_33_L2: json.payload.A_33_L2.toFixed(2),
            A_33_L3: json.payload.A_33_L3.toFixed(2),

            P_33_L1: json.payload.P_33_L1.toFixed(2),
            P_33_L2: json.payload.P_33_L2.toFixed(2),
            P_33_L3: json.payload.P_33_L3.toFixed(2),
            P_33_T: json.payload.P_33_T.toFixed(2),
            Q_33_T: json.payload.Q_33_T.toFixed(2),
            S_33_T: json.payload.S_33_T.toFixed(2),

            PF_33_L1: json.payload.PF_33_L1.toFixed(2),
            PF_33_L2: json.payload.PF_33_L2.toFixed(2),
            PF_33_L3: json.payload.PF_33_L3.toFixed(2),
            F_33_L1: json.payload.F_33_L1.toFixed(2),
            F_33_L2: json.payload.F_33_L2.toFixed(2),
            F_33_L3: json.payload.F_33_L3.toFixed(2),

            THDV_33_L1: json.payload.THDV_33_L1.toFixed(2),
            THDV_33_L2: json.payload.THDV_33_L2.toFixed(2),
            THDV_33_L3: json.payload.THDV_33_L3.toFixed(2),
            THDA_33_L1: json.payload.THDA_33_L1.toFixed(2),
            THDA_33_L2: json.payload.THDA_33_L2.toFixed(2),
            THDA_33_L3: json.payload.THDA_33_L3.toFixed(2),

            EI_33_L1: json.payload.EI_33_L1.toFixed(2),
            EI_33_L2: json.payload.EI_33_L2.toFixed(2),
            EI_33_L3: json.payload.EI_33_L3.toFixed(2),
            EI_33_T: json.payload.EI_33_T.toFixed(2),
          });
        }

        if (this.items_34.length >= 200) this.items_34.shift();
        if (json.payload.Status_34 === "Connected") {
          this.items_34.push({
            dt: json.payload.dt,
            V_34_L1: json.payload.V_34_L1.toFixed(2),
            V_34_L2: json.payload.V_34_L2.toFixed(2),
            V_34_L3: json.payload.V_34_L3.toFixed(2),
            A_34_L1: json.payload.A_34_L1.toFixed(2),
            A_34_L2: json.payload.A_34_L2.toFixed(2),
            A_34_L3: json.payload.A_34_L3.toFixed(2),

            P_34_L1: json.payload.P_34_L1.toFixed(2),
            P_34_L2: json.payload.P_34_L2.toFixed(2),
            P_34_L3: json.payload.P_34_L3.toFixed(2),
            P_34_T: json.payload.P_34_T.toFixed(2),
            Q_34_T: json.payload.Q_34_T.toFixed(2),
            S_34_T: json.payload.S_34_T.toFixed(2),

            PF_34_L1: json.payload.PF_34_L1.toFixed(2),
            PF_34_L2: json.payload.PF_34_L2.toFixed(2),
            PF_34_L3: json.payload.PF_34_L3.toFixed(2),
            F_34_L1: json.payload.F_34_L1.toFixed(2),
            F_34_L2: json.payload.F_34_L2.toFixed(2),
            F_34_L3: json.payload.F_34_L3.toFixed(2),

            THDV_34_L1: json.payload.THDV_34_L1.toFixed(2),
            THDV_34_L2: json.payload.THDV_34_L2.toFixed(2),
            THDV_34_L3: json.payload.THDV_34_L3.toFixed(2),
            THDA_34_L1: json.payload.THDA_34_L1.toFixed(2),
            THDA_34_L2: json.payload.THDA_34_L2.toFixed(2),
            THDA_34_L3: json.payload.THDA_34_L3.toFixed(2),

            EI_34_L1: json.payload.EI_34_L1.toFixed(2),
            EI_34_L2: json.payload.EI_34_L2.toFixed(2),
            EI_34_L3: json.payload.EI_34_L3.toFixed(2),
            EI_34_T: json.payload.EI_34_T.toFixed(2),
          });
        }

        if (this.items_35.length >= 200) this.items_35.shift();
        if (json.payload.Status_35 === "Connected") {
          this.items_35.push({
            dt: json.payload.dt,
            V_35_L1: json.payload.V_35_L1.toFixed(2),
            V_35_L2: json.payload.V_35_L2.toFixed(2),
            V_35_L3: json.payload.V_35_L3.toFixed(2),
            A_35_L1: json.payload.A_35_L1.toFixed(2),
            A_35_L2: json.payload.A_35_L2.toFixed(2),
            A_35_L3: json.payload.A_35_L3.toFixed(2),

            P_35_L1: json.payload.P_35_L1.toFixed(2),
            P_35_L2: json.payload.P_35_L2.toFixed(2),
            P_35_L3: json.payload.P_35_L3.toFixed(2),
            P_35_T: json.payload.P_35_T.toFixed(2),
            Q_35_T: json.payload.Q_35_T.toFixed(2),
            S_35_T: json.payload.S_35_T.toFixed(2),

            PF_35_L1: json.payload.PF_35_L1.toFixed(2),
            PF_35_L2: json.payload.PF_35_L2.toFixed(2),
            PF_35_L3: json.payload.PF_35_L3.toFixed(2),
            F_35_L1: json.payload.F_35_L1.toFixed(2),
            F_35_L2: json.payload.F_35_L2.toFixed(2),
            F_35_L3: json.payload.F_35_L3.toFixed(2),

            THDV_35_L1: json.payload.THDV_35_L1.toFixed(2),
            THDV_35_L2: json.payload.THDV_35_L2.toFixed(2),
            THDV_35_L3: json.payload.THDV_35_L3.toFixed(2),
            THDA_35_L1: json.payload.THDA_35_L1.toFixed(2),
            THDA_35_L2: json.payload.THDA_35_L2.toFixed(2),
            THDA_35_L3: json.payload.THDA_35_L3.toFixed(2),

            EI_35_L1: json.payload.EI_35_L1.toFixed(2),
            EI_35_L2: json.payload.EI_35_L2.toFixed(2),
            EI_35_L3: json.payload.EI_35_L3.toFixed(2),
            EI_35_T: json.payload.EI_35_T.toFixed(2),
          });
        }

        if (this.items_36.length >= 200) this.items_36.shift();
        if (json.payload.Status_36 === "Connected") {
          this.items_36.push({
            dt: json.payload.dt,
            V_36_L1: json.payload.V_36_L1.toFixed(2),
            V_36_L2: json.payload.V_36_L2.toFixed(2),
            V_36_L3: json.payload.V_36_L3.toFixed(2),
            A_36_L1: json.payload.A_36_L1.toFixed(2),
            A_36_L2: json.payload.A_36_L2.toFixed(2),
            A_36_L3: json.payload.A_36_L3.toFixed(2),

            P_36_L1: json.payload.P_36_L1.toFixed(2),
            P_36_L2: json.payload.P_36_L2.toFixed(2),
            P_36_L3: json.payload.P_36_L3.toFixed(2),
            P_36_T: json.payload.P_36_T.toFixed(2),
            Q_36_T: json.payload.Q_36_T.toFixed(2),
            S_36_T: json.payload.S_36_T.toFixed(2),

            PF_36_L1: json.payload.PF_36_L1.toFixed(2),
            PF_36_L2: json.payload.PF_36_L2.toFixed(2),
            PF_36_L3: json.payload.PF_36_L3.toFixed(2),
            F_36_L1: json.payload.F_36_L1.toFixed(2),
            F_36_L2: json.payload.F_36_L2.toFixed(2),
            F_36_L3: json.payload.F_36_L3.toFixed(2),

            THDV_36_L1: json.payload.THDV_36_L1.toFixed(2),
            THDV_36_L2: json.payload.THDV_36_L2.toFixed(2),
            THDV_36_L3: json.payload.THDV_36_L3.toFixed(2),
            THDA_36_L1: json.payload.THDA_36_L1.toFixed(2),
            THDA_36_L2: json.payload.THDA_36_L2.toFixed(2),
            THDA_36_L3: json.payload.THDA_36_L3.toFixed(2),

            EI_36_L1: json.payload.EI_36_L1.toFixed(2),
            EI_36_L2: json.payload.EI_36_L2.toFixed(2),
            EI_36_L3: json.payload.EI_36_L3.toFixed(2),
            EI_36_T: json.payload.EI_36_T.toFixed(2),
          });
        }
      } // END OF Overview
      if (json.cmd == "Error") {
        // this.loaded = false;
        // this.alertText = json.payload;
      }
    });
  },
};
</script>

<style scoped>
/deep/ .container {
  padding-right: 0px !important;
}

/deep/ .card-title {
  font-size: smaller;
  font-weight: bold;
}

/deep/ table {
  font-size: small;
  width: 3800px;
}

/deep/ .alert {
  padding: 0.3rem 0.5rem;
  margin: 5px 5px;
  width: 280px !important;
  font-size: 12px;
  font-weight: bold;
}

/deep/ .custom-select-sm {
  font-weight: bold;
  width: 300px !important;
}

.clock {
  font-size: smaller;
}

.freespace {
  font-size: smaller;
}

</style>
