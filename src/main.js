import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import router from "./router";
import store from "./store/store";
import './registerServiceWorker'

const app = createApp(App);

app.use(router);
app.use(store);


app.mount("#app");
