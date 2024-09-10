<script lang="ts" setup>
import { ref } from 'vue'
import { buttons } from '../model'
import * as math from 'mathjs'

const input = ref('')

const value = ref('')

const buttonHandler = (b) => {
    if (b.name === 'equal') {
        value.value = math.evaluate(input.value)
        return
    }

    if (b.name === 'clear') {
        input.value = ''
        value.value = ''
        return
    }

    if (b.name === 'del') {
        input.value = !input.value.length ? input.value : input.value.substring(0, input.value.length - 1)
        value.value = ''
        return
    }

    input.value += b.name
}
</script>

<template>
    <div class="calc p-5 w-fit shadow-md rounded-lg">
        <div class="pb-4">
            <div class="text-right text-3xl">
                <span class="opacity-0">0</span>
                {{ input }}
            </div>

            <div class="text-right text-4xl">
                <span class="opacity-0">0</span>
                {{ value }}
            </div>
        </div>

        <div class="grid grid-cols-4 gap-4 z-10">
            <button 
                v-for="b in buttons" 
                :style="`background: ${b.background}; color: ${b.color}`"
                class="flex justify-center items-center w-16 h-16 text-3xl font-thin shadow-sm"
                @click="buttonHandler(b)"
                @mousedown.stop
            >
                {{ b.label }}
            </button>
        </div>
    </div>
</template>

<style>
.calc {
    background: #F1F2F3;
}

.calc button {
    border-radius: 20px;
}
</style>