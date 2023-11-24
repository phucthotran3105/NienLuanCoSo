import { createApp } from "vue";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import dayjs from 'dayjs'
import CKEditor from '@ckeditor/ckeditor5-vue';

import router from './router';
const app = createApp(App)
app.use(router)
app.config.globalProperties.$dayjs = dayjs
app.use(CKEditor)

app.mount('#app')