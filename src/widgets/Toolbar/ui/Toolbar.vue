<script lang="ts" setup>
import { CalcIcon, NoteIcon } from '@/app/assets/icons';
import { type PropType, computed, ref } from 'vue';
import { useWidgetsStore } from '@/entities/widgets'

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
                :class="{'bg-blue-400': widgetStore.isWidgetActive('calc')}"
                class="rounded-lg p-1"
                @click="toggleCalcWidget('calc')"
            >
                <CalcIcon class="w-8 h-8" />
            </button>

            <button
                :class="{'bg-blue-400': widgetStore.isWidgetActive('note')}"
                class="rounded-lg p-1"
                @click="toggleCalcWidget('note')"
            >
                <NoteIcon class="w-8 h-8" />
            </button>
        </div>
    </div>
</template>