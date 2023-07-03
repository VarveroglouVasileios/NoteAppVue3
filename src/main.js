import { createApp } from "vue";
import App from "./App.vue";
import store from "./store/index";
import router from "./router";
import BaseButton from "./ui/BaseButton.vue";
import BaseDialog from "./ui/BaseDialog.vue";
const app = createApp(App);
app.component("base-button", BaseButton);
app.component("base-dialog", BaseDialog);

app.use(store);
app.use(router);
app.mount("#app");
