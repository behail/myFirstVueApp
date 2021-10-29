import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import router from "./router";
import store from "./store/store";
import "./registerServiceWorker";
import ExportExcelSheetVueJs from "export-excel-sheet-vue-js";
import VueGtag from "vue-gtag";

const app = createApp(App);

app.use(VueGtag, {
  config: { id: "UA-201825684-1" },
});

app.use(router);
app.use(store);
app.use(ExportExcelSheetVueJs);

app.mount("#app");
