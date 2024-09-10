import { defineStore } from "pinia";
import { ref } from "vue";

interface IWidget {
    name: string
    posY: number
    posX: number
}

export const useWidgetsStore = defineStore('widgets', () => {

    const widgets = ref<IWidget[]>([])
    
    const isWidgetActive = (name: string) => {
        return !!widgets.value.find(w => w.name === name)
    }

    const addWidget = (name: string, posX = 200, posY = 200) => {
        if (isWidgetActive(name)) return

        widgets.value.push({
            name,
            posX,
            posY
        })
    }
    
    const removeWidget = (name: string) => {
        widgets.value = widgets.value.filter(w => w.name !== name)
    }

    const changeWidgetPosition = (name: string, posX: number, posY: number) => {
        const widget = widgets.value.find(w => w.name === name)
        
        if (widget) {
            widget.posX = posX ?? widget.posX
            widget.posY = posY ?? widget.posY
        }
    }

    return {
        widgets,
        addWidget,
        isWidgetActive,
        removeWidget,
        changeWidgetPosition
    }
})