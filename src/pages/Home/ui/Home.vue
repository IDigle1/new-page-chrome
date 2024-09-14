<script lang="ts" setup>
import { ElButton } from 'element-plus'
import { Watch } from '@/features/Watch';
import { SearchSystem } from '@/widgets/SearchSystem'
import { FavoriteLinks } from '@/widgets/FavoriteLinks'
import { Toolbar } from '@/widgets/Toolbar';
import { Widgets } from '@/widgets/Widgets'
import Sidebar from '@/widgets/SideBar/ui/Sidebar.vue';
import { Tools } from '@element-plus/icons-vue';
import { useAppSettings } from '@/entities/app-settings';

const appSettings = useAppSettings()
</script>

<template>
    <div 
        class="pt-20 h-screen"
        :style="`
            background: ${appSettings.backgroundSettings.appBackgroundColor};
            background-image: url(${appSettings.backgroundSettings.appBackgroundImage});
            background-repeat: ${appSettings.backgroundSettings.appBackgroundImageRepeat};
            background-position: ${appSettings.backgroundSettings.appBackgroundImagePosition};
            background-size: ${appSettings.backgroundSettings.appBackgroundImageSize};
        `"
    >
        <ElButton
            class="absolute top-4 left-4"
            text
            @click="appSettings.changeSidebarVisibility(true)"
        >
            <Tools class="w-6 h-6" />
        </ElButton>

        <div class="mb-20">
            <Watch />
        </div>

        <div class="max-w-[1000px] px-20 mx-auto">
            <div>
                <SearchSystem />
            </div>

            <div class="mt-6">
                <FavoriteLinks />
            </div>
        </div>

        <Sidebar />

        <Widgets />

        <Toolbar />
    </div>
</template>