import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import VueCookies from 'vue-cookies'
import store from './store'
import JwPagination from 'jw-vue-pagination';

const app = createApp(App)

app.use(router)
app.use(store)
app.use(JwPagination)
// app.use(JwPagination)
app.use(VueCookies, { expire: '1h'});
app.mount('#app')
