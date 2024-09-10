<script lang="ts" setup>
import { computed, ref } from 'vue';
import { Dropdown } from '@/shared/ui/Dropdown'
import { GoogleIcon, YandexIcon } from '@/app/assets/icons'

type SearchSystems = 'google' | 'yandex'

interface ISearchSystem {
    name: SearchSystems
    label: string
    searchUrl(searchQuery: string): string
}

const systems: ISearchSystem[] = [
    { 
        name: 'google', 
        label: 'Google',
        searchUrl(searchQuery) {
            return `https://www.google.com/search?q=${searchQuery.replace(/\s/g, '+')}`
        }
    },
    { 
        name: 'yandex', 
        label: 'Яндекс',
        searchUrl(searchQuery) {
            return `https://yandex.ru/search/?text=${searchQuery.replace(/\s/g, '+')}`
        }
    },
]

const searchInputQuery = ref('')

const currentSystem = ref<SearchSystems>('google')

const getCurrentSystem = computed<ISearchSystem>(() => {
    return systems.find((sys) => sys.name === currentSystem.value)!
})

const goToSearchSystem = () => {
    location.href = getCurrentSystem.value.searchUrl(searchInputQuery.value)
}

</script>

<template>
    <div class="flex">
        <Dropdown 
            v-model="currentSystem"
            class="flex items-center bg-white rounded-l-lg pl-2 p-2 shadow-md border-r border-gray-200"
            value-key="name"
            :options="systems" 
        >
            <template #selected-option="{ selectedOption }">
                <div class="flex items-center h-full">
                    <GoogleIcon v-if="selectedOption.name === 'google'" class="w-6 h-6" />
                    <YandexIcon v-if="selectedOption.name === 'yandex'" class="w-6 h-6" />
                </div>
            </template>
        </Dropdown>
        <input
            v-model="searchInputQuery"
            class="outline-none w-full block bg-white border-none rounded-r-lg shadow-md text-lg pl-4 p-2" 
            type="text" 
            :placeholder="`Поиск ${getCurrentSystem.label}`"
            @keypress.enter="goToSearchSystem"
        >
    </div>
</template>@/shared/ui/Dropdown