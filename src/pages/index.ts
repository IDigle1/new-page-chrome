import { type RouteRecordRaw } from "vue-router"
import { Home } from "./Home"

export const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Home',
        component: Home
    }
]