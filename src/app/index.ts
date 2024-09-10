import { createApp } from 'vue'
import './index.css'
import App from './App.vue'
import { router } from './providers/routers'
import { pinia } from './providers/pinia'

const app = createApp(App)

app.use(router)
app.use(pinia)

export { app }