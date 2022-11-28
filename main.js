import App from './App'
import Md5 from 'js-md5'

// #ifndef VUE3
import Vue from 'vue';
import uView from "uview-ui";
import tool from '@/utils/tool.js';

Vue.prototype.$tool = tool;
Vue.prototype.$md5 = Md5;

Vue.use(uView);
const app = new Vue({
	...App
})
app.$mount()
// #endif
