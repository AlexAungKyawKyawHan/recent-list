import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import moment from "moment";
import InfiniteScroll from 'v-infinite-scroll'


Vue.use(InfiniteScroll)

Vue.config.productionTip = false
Vue.filter('formatDate', function (value) {
  if (value) {
    return moment(String(value)).format('DD MM YYYY')
  }
});

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
