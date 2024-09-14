import { defineStore } from "pinia";
import { ref } from "vue";
import type { IBackgroundSettings, IWatchSettings } from "./types";

export const useAppSettings = defineStore('app-settings', () => {
    const showSidebar = ref(false)

    const changeSidebarVisibility = (isShown: boolean) => {
        showSidebar.value = isShown
    }

    // BackgroundSettings ==========
    const backgroundSettings = ref<IBackgroundSettings>({
        appBackgroundColor: 'rgb(229, 231, 235)',
        appBackgroundImage: '',
        appBackgroundImageRepeat: 'repeat',
        appBackgroundImagePosition: 'top',
        appBackgroundImageSize: 'auto',
    })
    
    const setBackgroundSettings = (settings: IBackgroundSettings) => {
        backgroundSettings.value = settings
    }

    // Watch Settings ==============
    const watchSettings = ref<IWatchSettings>({
        watchColor: 'rgb(55, 65, 81)'
    })

    const setWatchSettings = (settings: IWatchSettings) => {
        watchSettings.value = settings
    }

    return {
        showSidebar,
        changeSidebarVisibility,

        backgroundSettings,
        setBackgroundSettings,

        watchSettings,
        setWatchSettings
    }
})