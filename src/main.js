import { createApp } from "vue"
import App from "./app.vue"

const app = createApp(App)
app.mount("#app")

import("./app.js").then(res => {
	console.log(res.test)
})
