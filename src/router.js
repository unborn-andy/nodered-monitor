import Vue from "vue";
import VueRouter from "vue-router";
import Home from "./components/Home";
// import Table from "./components/Table";
import Overview from "./components/Overview";
import Power from "./components/Power";
import Volts from "./components/Volts";
import Current from "./components/Current";
import Frequency from "./components/Frequency";
import HarmonicsCurrent from "./components/HarmonicsCurrent";
import HarmonicsVoltage from "./components/HarmonicsVoltage";
import Powerfactor from "./components/Powerfactor";
import EnergyAccMonthly from "./components/EnergyAccMonthly";
import energyMonthly from "./components/EnergyMonthly";
import energyYearly from "./components/EnergyYearly";
import energyTotal from "./components/EnergyTotal";

//import store from './store';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: "monitor",
  linkActiveClass: "active",
  routes: [
    {
      path: "/",
      component: Home,
    },
    // {
    //   path: "/table",
    //   component: Table,
    // },
    {
      path: "/overview",
      component: Overview
    },
    {
      path: "/power",
      component: Power,
    },
    {
      path: "/volts",
      component: Volts,
    },
    {
      path: "/current",
      component: Current,
    },
    {
      path: "/powerfactor",
      component: Powerfactor,
    },
    {
      path: "/harmonicsVoltage",
      component: HarmonicsVoltage,
    },
    {
      path: "/harmonicsCurrent",
      component: HarmonicsCurrent,
    },
    {
      path: "/frequency",
      component: Frequency,
    },
     {
       path: "/energyAccMonthly",
       component: EnergyAccMonthly,
     },
     {
       path: "/energyMonthly",
       component: energyMonthly,
     },
     {
      path: "/energyYearly",
      component: energyYearly,
    },
     {
      path: "/energyTotal",
      component: energyTotal,
    },
    {
      path: "*",
      //path: '/:catchAll(.*)',
      redirect: "/",
    },
  ],
});

export default router;
