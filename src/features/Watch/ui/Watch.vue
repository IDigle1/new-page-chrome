<script lang="ts" setup>
import { dayjs } from '@/shared/lib/dayjs';
import { ref } from 'vue';
import { onUnmounted } from 'vue';

const time = ref('')

const timer = setInterval(() => {
    time.value = dayjs().format('HH:mm')
}, 1000)

onUnmounted(() => {
    clearInterval(timer)
})
</script>

<template>
    <div class="text-8xl text-center text-gray-700 drop-shadow-lg">
        {{ time }}
    </div>
</template>