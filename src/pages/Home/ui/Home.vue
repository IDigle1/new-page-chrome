<script lang="ts" setup>
import { Watch } from '@/features/Watch';
import { SearchSystem } from '@/widgets/SearchSystem'
import { FavoriteLinks } from '@/widgets/FavoriteLinks'
import { Toolbar } from '@/widgets/Toolbar';
import { Widgets } from '@/widgets/Widgets'
</script>

<template>
    <div class="pt-20">
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

        <Widgets />

        <Toolbar />
    </div>
</template>