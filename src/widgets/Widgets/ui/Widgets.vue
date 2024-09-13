<script lang="ts" setup>
import { useWidgetsStore, widgets } from '@/entities/widgets'
import type { ComponentInstance } from 'vue';

type MoveHandler = (we: any) => any

interface IWidgets {
    [key: string]: {
        component: ComponentInstance<any>
        moveHandler: MoveHandler | null
    }
}
const createWidgetsState = () => {
    const stateEtries = widgets.map(w => [w.name, { component: w.component, moveHandler: null }])

    return Object.fromEntries(stateEtries)
}

const widgetsState: IWidgets = createWidgetsState()


const widgetStore = useWidgetsStore()

const move = (e: any, widgetName: string) => {
    return (we: any) => {
        widgetStore.changeWidgetPosition(widgetName, we.screenX - e.offsetX, we.screenY - e.offsetY - 205)
    }
}

const mousedownHanler = (e: MouseEvent, widgetName: string) => {
    widgetsState[widgetName].moveHandler = move(e, widgetName)
    window.addEventListener('mousemove', widgetsState[widgetName].moveHandler)
    window.addEventListener('mouseup', () => {
        if (widgetsState[widgetName].moveHandler) {
            window.removeEventListener('mousemove', widgetsState[widgetName].moveHandler)
        }
    })
}
</script>

<template>
    <component
        v-for="w in widgetStore.widgetsState"
        :ref="w.name"
        :is="widgetsState[w.name as keyof typeof widgetsState].component"
        :key="w.name"
        :class="`fixed`"
        :style="`left: ${w.posX}px; top: ${w.posY}px`"
        @mousedown="mousedownHanler($event, w.name)"
    />
</template>