/* jshint browser: true, esversion: 5, asi: true */
/*globals Vue, uibuilder */
// @ts-nocheck
/*
  Copyright (c) 2019 Julian Knight (Totally Information)

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

import Vue from 'vue'
import App from './components/App.vue'
import router from './router'

//  import uibuilder from './../../../node_modules/node-red-contrib-uibuilder/nodes/src/uibuilderfe.js'
import uibuilder from './../../../node_modules/node-red-contrib-uibuilder/front-end/src/uibuilderfe.js'
//import uibuilder from './uibuilderfe.js'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


// Vue.use(uibuilder)
window.uibuilder = uibuilder;


new Vue({
    el: '#app',
  // runtimerCompiler: true, 
    router,
  //  store,
    render: h => h(App)
})

