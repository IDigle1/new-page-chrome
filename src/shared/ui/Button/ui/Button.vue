<script lang="ts" setup>
import { type PropType, computed, ref } from 'vue';

const props = defineProps({
    modelValue: {
        type: [String, Number, Array, Object],
        default: ''
    },
    options: {
        type: Array as PropType<{ [key: string]: any }>,
        default: () => []
    },
    valueKey: {
        type: String,
        default: 'value'
    },
    labelKey: {
        type: String,
        default: 'label'
    }
})

const emit = defineEmits(['update:model-value'])

const currentOption = computed(() => {
    return props.options.find((o: any) => o[props.valueKey] === props.modelValue)
})

const showDropdown = ref(false)
</script>

<template>
    <div class="relative" @click="showDropdown = !showDropdown">
        <div
            class="cursor-pointer"
        >
            <slot name="selected-option" :selectedOption="currentOption">
                {{ currentOption }}
            </slot>
        </div>
        <div
            v-if="showDropdown" 
            class="pt-2 absolute top-full min-w-full left-0"
        >
            <div class="bg-white rounded-lg shadow-md">
                <div 
                    v-for="o in options"
                    class="px-3 py-2 hover:bg-gray-50 cursor-pointer"
                    @click.stop="emit('update:model-value', o[props.valueKey]); showDropdown = false"
                >
                    {{ o[props.labelKey] }}
                </div>
            </div>
        </div>
    </div>
</template>