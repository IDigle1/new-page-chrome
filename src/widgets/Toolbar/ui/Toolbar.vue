<script lang="ts" setup>
import { CalcIcon, NoteIcon, ToDoIcon } from '@/app/assets/icons';
import { type PropType, computed, ref } from 'vue';
import { useWidgetsStore, widgets } from '@/entities/widgets'

const widgetStore = useWidgetsStore()

const props = defineProps({
    position: {
        type: String as PropType<'bottom' | 'left' | 'right'>,
        default: 'bottom'
    }
})

const toggleCalcWidget = (widgetName: string) => {
    if (widgetStore.isWidgetActive(widgetName)) {

        widgetStore.removeWidget(widgetName)
    } else {
        widgetStore.addWidget(widgetName)
    }
}
</script>

<template>
    <div class="fixed bottom-2 max-h-fit flex justify-center w-full">
        <div class="flex rounded-lg shadow-md p-1 bg-white gap-2">
            <button
                v-for="w in widgets"
                :class="{'bg-blue-400': widgetStore.isWidgetActive(w.name)}"
                class="rounded-lg p-1"
                @click="toggleCalcWidget(w.name)"
            >
                <component :is="w.icon"  class="w-8 h-8" />
            </button>
        </div>
    </div>
</template>