<template lang="html">
  <b-container fluid class="bg">
    <b-row align-v="end" class="ml-5">
      <b-col cols="12">
        <b-img src="./img/company_sphere.png" fluid alt="Logo" class="mt-5 mb-3"></b-img>
        <b-jumbotron bg-variant="transparent">
          <b-row class="d-flex align-items-center">
            <b-col cols="3" class="details">
              <p>
                <b-icon icon="signpost"></b-icon>
                &ensp;xxxxxx 5, xxxxxxxx
              </p>
              <p class="mb-4">&ensp;&ensp;&ensp; xxxxxx, xxxxxx, xxxxx, xxxxxxx</p>
              <p>
                <b-icon icon="telephone-forward"></b-icon>
                &ensp;+xxx xxxxxxx
              </p>
              <p class="mb-4">
                <b-icon icon="telephone-x"></b-icon>
                &ensp;+xxx xxxxxxxxxx (fax)
              </p>
              <p>
                <b-icon icon="envelope-open"></b-icon>
                &ensp;
                <a href="mailto:xxxxxxx@xxxx.com">xxxxxx@xxxxx.com</a>
              </p>
              <p class="mb-4">
                <b-icon icon="globe"></b-icon>

                &ensp;
                <a href="http://www.xxxxxxx.com">www.xxxxxxxx.com</a>
              </p>
              <p>&ensp;For more information visit website</p>
            </b-col>
            <b-col cols="3">
              <b-img src="./img/services.png" fluid alt="Logo" class="mt-3 mb-3"></b-img>
            </b-col>
          </b-row>
        </b-jumbotron>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      msg: "No Message Received from Node-Red",
    };
  },
  methods: {},

  // mounted() {

  //   uibuilder.onChange("msg", (json) => {
  //     //  console.info("Msg received from Node-RED server in Home:", json);
  //     this.msg = JSON.stringify(json, undefined, 2);
  //   });
  // },
};
</script>

<style scoped>
p {
  font-weight: bold;
  margin-bottom: 0rem;
}

/* body {

   height: 100vh;
} */

.bg {
  /* The image used */
  background-image: linear-gradient(to left, rgba(255, 255, 255, 0), rgb(255, 255, 255) 90%), url("../img/power-plant-header.jpg");

  /* Full height */
  height: calc(100vh - 60px);

  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.details {
  /* opacity: 0; */
  animation: animateIn 2s ease-in-out;
  /* animation-delay: 2s; */
}

@keyframes animateIn {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* pre {
  white-space: pre-wrap;
  border-radius: 20px;
  line-height: 1.3;
  background-color: #369;
  color: #fff;
  padding: 20px;
} */
</style>
