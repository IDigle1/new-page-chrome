<script lang="ts" setup>
</script>

<template>
    <div class="bg-white shadow-md rounded-md w-60 h-80">
        <div 
            class="flex justify-end items-center px-3 h-8 border-b border-gray-200"
        >
            <button class="flex flex-col gap-1" @mousedown.stop>
                <div class="h-[2px] w-4 bg-slate-600 rounded"></div>
                <div class="h-[2px] w-4 bg-slate-600 rounded"></div>
                <div class="h-[2px] w-4 bg-slate-600 rounded"></div>
            </button>
        </div>
        <div class="outline-none h-full w-full p-2 bg-slate-50" :contenteditable="true" @mousedown.stop>

        </div>
    </div>
</template>