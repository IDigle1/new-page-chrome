import { defineStore } from "pinia";
import { ref } from "vue";

interface IWidget {
    name: string
    posY: number
    posX: number
}

export const useWidgetsStore = defineStore('widgetsState', () => {
    const widgetsState = ref<IWidget[]>([])
    
    const isWidgetActive = (name: string) => {
        return !!widgetsState.value.find(w => w.name === name)
    }

    const addWidget = (name: string, posX = 200, posY = 200) => {
        if (isWidgetActive(name)) return

        widgetsState.value.push({
            name,
            posX,
            posY
        })
    }
    
    const removeWidget = (name: string) => {
        widgetsState.value = widgetsState.value.filter(w => w.name !== name)
    }

    const changeWidgetPosition = (name: string, posX: number, posY: number) => {
        const widget = widgetsState.value.find(w => w.name === name)
        
        if (widget) {
            widget.posX = posX ?? widget.posX
            widget.posY = posY ?? widget.posY
        }
    }

    return {
        widgetsState,
        addWidget,
        isWidgetActive,
        removeWidget,
        changeWidgetPosition
    }
})