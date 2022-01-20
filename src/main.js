import { createApp } from 'vue'


import App from './App.vue'
import router from './router'
// import store from "./store";


require('./assets/scss/index.scss')


let app = createApp(App)

app
// .use(store)
.use(router)
.mount('#app')
