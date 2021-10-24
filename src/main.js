import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import router from "./router";
import store from "./store/store";
import './registerServiceWorker'
import ExportExcelSheetVueJs from "export-excel-sheet-vue-js";



const app = createApp(App);

app.use(router);
app.use(store);
app.use(ExportExcelSheetVueJs);

app.mount("#app");
