<script lang="ts" setup>
import { useAppSettings } from '@/entities/app-settings';
import { dayjs } from '@/shared/lib/dayjs';
import { ref } from 'vue';
import { onUnmounted } from 'vue';

const appSetings = useAppSettings()

const time = ref('')

const timer = setInterval(() => {
    time.value = dayjs().format('HH:mm')
}, 1000)

onUnmounted(() => {
    clearInterval(timer)
})
</script>

<template>
    <div 
        class="text-8xl text-center drop-shadow-lg"
        :style="`
            color: ${appSetings.watchSettings.watchColor}
        `"
    >
        {{ time }}
    </div>
</template>