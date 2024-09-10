<script lang="ts" setup>
import { useWidgetsStore } from '@/entities/widgets'
import { Calculator } from '@/features/Calculator'
import { Note } from '@/features/Note'

const widgets = {
    calc: {
        component: Calculator,
        moveHandler: null
    },
    note: {
        component: Note,
        moveHandler: null
    },
}

const widgetStore = useWidgetsStore()

const move = (e, widgetName: string) => {
    return (we) => {
        widgetStore.changeWidgetPosition(widgetName, we.screenX - e.offsetX, we.screenY - e.offsetY - 205)
    }
}

const mousedownHanler = (e: MouseEvent, widgetName: string) => {
    widgets[widgetName].moveHandler = move(e, widgetName)
    window.addEventListener('mousemove', widgets[widgetName].moveHandler)
    window.addEventListener('mouseup', () => {
        window.removeEventListener('mousemove', widgets[widgetName].moveHandler)
    })
}


</script>

<template>
    <component
        v-for="w in widgetStore.widgets"
        :ref="w.name"
        :is="widgets[w.name].component"
        :key="w.name"
        :class="`fixed`"
        :style="`left: ${w.posX}px; top: ${w.posY}px`"
        @mousedown="mousedownHanler($event, w.name)"
    />
</template>