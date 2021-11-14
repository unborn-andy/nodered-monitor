<template>
  <div>
    <b-navbar type="dark" variant="dark">
      <b-navbar-nav>
        <b-nav-text>
          <b-icon-lightning-fill animation="fade" style="animation-duration: 1.75s" scale="1.5" class="text-warning"></b-icon-lightning-fill>
          <span class="ml-3 mr-5 hvr-buzz-out">Energy Monitor</span>
        </b-nav-text>
        <b-nav-item to="/" exact :active="$route.name == 'home'">Home</b-nav-item>
        <b-nav-item to="/overview" exact :active="$route.name == 'overview'">Overview</b-nav-item>
        <b-nav-item to="/volts" exact :active="$route.name == 'volts'">Volts</b-nav-item>
        <b-nav-item to="/current" exact :active="$route.name == 'current'">Current</b-nav-item>
        <b-nav-item to="/frequency" exact :active="$route.name == 'frequency'">Frequency</b-nav-item>
        <b-nav-item to="/powerfactor" exact :active="$route.name == 'powerfactor'">Powerfactor</b-nav-item>
        <b-nav-item-dropdown text="Harmonics" left :class="{ active: $route.path.startsWith('/harmonics') }">
          <b-dropdown-item to="/harmonicsVoltage" exact :active="$route.name == 'harmonicsVoltage'">Voltage</b-dropdown-item>
          <b-dropdown-item to="/harmonicsCurrent" exact :active="$route.name == 'harmonicsCurrent'">Current</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item to="/power" exact :active="$route.name == 'power'">Power</b-nav-item>
        <!-- Energy dropdowns -->
        <b-nav-item-dropdown text="Energy" left :class="{ active: $route.path.startsWith('/energy') }">
          <b-dropdown-item to="/energyAccMonthly" exact :active="$route.name == 'energyAccMonthly'">Accumulative Monthly</b-dropdown-item>
          <b-dropdown-item to="/energyMonthly" exact :active="$route.name == 'energyMonthly'">Monthly</b-dropdown-item>
          <b-dropdown-item to="/energyYearly" exact :active="$route.name == 'energyYearly'">Yearly</b-dropdown-item>
          <b-dropdown-item to="/energyTotal" exact :active="$route.name == 'energyTotal'">Total</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item>
          <!-- v-b-tooltip.hover.left.v-danger="'Shutdown the device !'" -->
          <b-button size="sm" variant="info" @click="downloadDb" v-b-tooltip="{ trigger: 'hover', title: 'Download the Database', placement: 'left', variant: 'info' }"><b-icon icon="arrow-down-square-fill"></b-icon></b-button>
          <b-button size="sm" variant="danger" @click="$bvModal.show('modal-shutdown')" v-b-tooltip="{ trigger: 'hover', title: 'Shutdown the device', placement: 'left', variant: 'danger' }"><b-icon icon="power"></b-icon></b-button>
        </b-nav-item>
      </b-navbar-nav>
    </b-navbar>

    <!-- Shutdown Modal  -->
    <b-modal id="modal-shutdown" no-fade header-bg-variant="secondary" header-text-variant="light">
      <template #modal-header>
        <h5>Shutdown</h5>
      </template>

      <template #default>
        <h5>Are you sure you want to power off the device ?</h5>
      </template>

      <template #modal-footer="{ ok, cancel}">
        <!-- Emulate built in modal footer ok and cancel button actions -->
        <b-button
          size="sm"
          variant="danger"
          @click="
            shutDown();
            ok();
          "
        >
          OK
        </b-button>
        <b-button size="sm" variant="success" @click="cancel()">Cancel</b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
export default {
  methods: {
    shutDown() {
      uibuilder.send({
        cmd: "shutdown",
      });
      console.log("Message sent for Shutdown");
    },

    downloadDb() {
      let url = `http://${window.location.host}/downloadDb`;
      console.log(url);
      // window.open(url, "_blank");
      window.location.assign(url);
    },
  },
};
</script>

<style scoped>
/deep/ .dropdown-item.router-link-exact-active,
/deep/ .dropdown-item:active {
  background-color: #a8a8a8 !important;
}

/deep/ .dropdown-item:active {
  background-color: #ffc107 !important;
}

.b-tooltip-danger {
  margin-right: 45px !important;
}
.b-tooltip-info {
  margin-right: 5px !important;
}

/deep/ .modal-header {
  padding: 0.2rem 1rem !important;
}

/* Buzz Out */
@-webkit-keyframes hvr-buzz-out {
  10% {
    -webkit-transform: translateX(3px) rotate(2deg);
    transform: translateX(3px) rotate(2deg);
  }
  20% {
    -webkit-transform: translateX(-3px) rotate(-2deg);
    transform: translateX(-3px) rotate(-2deg);
  }
  30% {
    -webkit-transform: translateX(3px) rotate(2deg);
    transform: translateX(3px) rotate(2deg);
  }
  40% {
    -webkit-transform: translateX(-3px) rotate(-2deg);
    transform: translateX(-3px) rotate(-2deg);
  }
  50% {
    -webkit-transform: translateX(2px) rotate(1deg);
    transform: translateX(2px) rotate(1deg);
  }
  60% {
    -webkit-transform: translateX(-2px) rotate(-1deg);
    transform: translateX(-2px) rotate(-1deg);
  }
  70% {
    -webkit-transform: translateX(2px) rotate(1deg);
    transform: translateX(2px) rotate(1deg);
  }
  80% {
    -webkit-transform: translateX(-2px) rotate(-1deg);
    transform: translateX(-2px) rotate(-1deg);
  }
  90% {
    -webkit-transform: translateX(1px) rotate(0);
    transform: translateX(1px) rotate(0);
  }
  100% {
    -webkit-transform: translateX(-1px) rotate(0);
    transform: translateX(-1px) rotate(0);
  }
}
@keyframes hvr-buzz-out {
  10% {
    -webkit-transform: translateX(3px) rotate(2deg);
    transform: translateX(3px) rotate(2deg);
  }
  20% {
    -webkit-transform: translateX(-3px) rotate(-2deg);
    transform: translateX(-3px) rotate(-2deg);
  }
  30% {
    -webkit-transform: translateX(3px) rotate(2deg);
    transform: translateX(3px) rotate(2deg);
  }
  40% {
    -webkit-transform: translateX(-3px) rotate(-2deg);
    transform: translateX(-3px) rotate(-2deg);
  }
  50% {
    -webkit-transform: translateX(2px) rotate(1deg);
    transform: translateX(2px) rotate(1deg);
  }
  60% {
    -webkit-transform: translateX(-2px) rotate(-1deg);
    transform: translateX(-2px) rotate(-1deg);
  }
  70% {
    -webkit-transform: translateX(2px) rotate(1deg);
    transform: translateX(2px) rotate(1deg);
  }
  80% {
    -webkit-transform: translateX(-2px) rotate(-1deg);
    transform: translateX(-2px) rotate(-1deg);
  }
  90% {
    -webkit-transform: translateX(1px) rotate(0);
    transform: translateX(1px) rotate(0);
  }
  100% {
    -webkit-transform: translateX(-1px) rotate(0);
    transform: translateX(-1px) rotate(0);
  }
}
.hvr-buzz-out {
  display: inline-block;
  /* vertical-align: middle; */
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
}
.hvr-buzz-out:hover,
.hvr-buzz-out:focus,
.hvr-buzz-out:active {
  -webkit-animation-name: hvr-buzz-out;
  animation-name: hvr-buzz-out;
  -webkit-animation-duration: 0.75s;
  animation-duration: 0.75s;
  -webkit-animation-timing-function: linear;
  animation-timing-function: linear;
  -webkit-animation-iteration-count: 1;
  animation-iteration-count: 1;
}
</style>
