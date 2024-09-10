<script lang="ts" setup>
import { PlusIcon } from '@/app/assets/icons'
import dayjs from 'dayjs';
import { onMounted } from 'vue';
import { computed } from 'vue';
import { ref, watch } from 'vue';

const showList = ref(true)

interface INote {
    id: number
    text: string
}

const notes = ref<INote[]>([])

const currentNoteId = ref<number | null>(null)

const createNewNote = () => {
    const id = dayjs().unix()

    notes.value.push({
        id,
        text: ''
    })

    currentNoteId.value = id

    showList.value = false
}

const noteModel = computed({
    get: () => {
        return notes.value.find(n => n.id === currentNoteId.value)?.text || ''
    },
    set: (value: string) => {
        const note = notes.value.find(n => n.id === currentNoteId.value)

        if (note) {
            note.text = value
        }
    }
})

const noteInputhandler = (e: any) => {
    noteModel.value = e.target.innerText
}

const selectNoteHandler = (noteId: number) => {
    currentNoteId.value = noteId

    showList.value = false
}

watch(() => notes, () => {
    localStorage.setItem('notes', JSON.stringify(notes.value))
}, { deep: true })

onMounted(() => {
    try {
        const data = JSON.parse(localStorage.getItem('notes') as string) as INote[] | null

        if (Array.isArray(data)) {
            notes.value = data.filter(note => note.text)
        }
    } catch (error) {
        
    }
})
</script>

<template>
    <div class="bg-white shadow-md rounded-md w-72 h-80">
        <div 
            class="flex justify-end items-center px-3 h-8 border-b border-gray-200"
        >
            <div class="flex items-center w-fit" @mousedown.stop>
                <button
                    v-if="!showList"
                    class="flex flex-col gap-[3px]" 
                    @click="showList = true"
                >
                    <div class="h-[2px] w-4 bg-slate-600 rounded"></div>
                    <div class="h-[2px] w-4 bg-slate-600 rounded"></div>
                    <div class="h-[2px] w-4 bg-slate-600 rounded"></div>
                </button>
    
                <button
                    v-if="showList"
                    class="h-4 w-4"
                    @click="createNewNote"
                >
                    <PlusIcon class="w-4 h-4" />
                </button>
            </div>
        </div>
        
        <div class="h-full" @mousedown.stop>
            <div 
                v-if="!showList"
                class="outline-none h-full w-full p-2 bg-slate-50"
                :contenteditable="true"
                @input="noteInputhandler"
            >
                {{ noteModel }}
            </div>

            <div
                v-if="showList"
                class="outline-none h-full w-full pb-8"
            >
                <div class="overflow-y-auto h-full max-h-full">
                    <template v-if="notes.length">
                        <div
                            v-for="n in notes"
                            class="p-2 border-b border-gray-200 cursor-pointer"
                            @click="selectNoteHandler(n.id)"
                        >
                            {{ n.text.substring(0, 20) }}{{ n.text.length > 20 ? '...' : '' }}
                        </div>
                    </template>
    
                    <div
                        v-if="!notes.length"
                        class="text-gray-400 h-full flex justify-center items-center"
                    >
                        Нет заметок
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>