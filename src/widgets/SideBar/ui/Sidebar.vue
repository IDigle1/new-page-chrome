<template>
    <div class="fixed top-0 bottom-0 left-0 w-px">
        <div
            :class="[appSetings.showSidebar ? 'right-0' : 'right-72']"
            class="relative p-4 w-72 h-full bg-white shadow-lg transition-all duration-200"
        >  
            <ElButton
                class="absolute w-6 top-4 right-4 cursor-pointer"
                text
                @click="appSetings.changeSidebarVisibility(false)"
            >
                <Close class="w-6 h-6" />
            </ElButton>
            <div
                class="mb-4 text-lg"
            >
                Настройки фона
            </div>

            <BackgroundSettingForm />

            <div
                class="mb-4 text-lg"
            >
                Настройки часов
            </div>

            <WatchSettingsForm />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ElButton } from 'element-plus';
import { Close } from '@element-plus/icons-vue';
import { useAppSettings } from '@/entities/app-settings';
import BackgroundSettingForm from './BackgroundSettingForm.vue';
import WatchSettingsForm from './WatchSettingsForm.vue';

const appSetings = useAppSettings()
</script>

<style lang="scss">
</style>