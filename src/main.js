import { createApp } from 'vue'
import { createPinia } from 'pinia'
import FloatingVue from 'floating-vue'

import App from './App.vue'
import router from './router'
import Toast from "vue-toastification"
import './assets/main.css'
import 'floating-vue/dist/style.css'
import "vue-toastification/dist/index.css";
import store from "./store";
import {vfmPlugin}  from 'vue-final-modal';
import VueApexCharts from "vue3-apexcharts";
import mitt from 'mitt';
const emitter = mitt();
const app = createApp(App)
app.config.globalProperties.emitter = emitter;
app.use(createPinia())
app.use(router)
app.use(FloatingVue)
app.use(Toast);
app.use(store);
app.use(vfmPlugin({
    key: '$vfm',
    componentName: 'VueFinalModal',
    dynamicContainerName: 'ModalsContainer'
}));
app.use(emitter);
app.use(VueApexCharts);
app.mount('#app')


