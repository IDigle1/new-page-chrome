<script lang="ts" setup>
import { ElDialog, ElButton } from 'element-plus'
import { PlusIcon } from '@/app/assets/icons'
import { ref, onMounted, watch } from 'vue';
import { Close, Edit } from '@element-plus/icons-vue';
import LinkForm from './LinkForm.vue';

const links = ref<ILink[]>([
])

const showLinkDialog = ref(false)
const linkFormRef = ref<InstanceType<typeof LinkForm>>()

const addLinkHandler = (link: ILink) => {
    if (!editMode) {
        links.value.push(link)
    
        showLinkDialog.value = false
    } else {
        const index = links.value.findIndex(l => l.url === link.url)

        if (index >= 0) {
            links.value[index] = link
        }
    }
}

const editMode = ref(false)

const currentLink = ref<ILink | null>(null)

const linkClickHandler = (e: MouseEvent) => {
    if (editMode) {
        e.preventDefault()
    } else {

    }
}

watch(() => links, () => {
    localStorage.setItem('favorite-links', JSON.stringify(links.value))
}, { deep: true })

onMounted(() => {
    try {
        const data = JSON.parse(localStorage.getItem('favorite-links') || '[]')

        if (Array.isArray(data)) {
            links.value = data
        }
    } catch (error) {
        showLinkDialog.value = true
    }
})
</script>

<template>
    <div class="flex gap-2">
        <a
            v-for="l in links"
            class="flex relative justify-center items-center bg-white shadow-md h-10 w-10 p-2 rounded-full"
            :href="l.url"
            :title="l.label"
            @click="linkClickHandler"
        >
            <button
                v-if="editMode"
                class="absolute flex justify-center items-center rounded-full top-[-4px] right-[-4px] w-4 h-4 bg-gray-600 text-gray-200"
                @click.prevent.stop="links = links.filter(link => link !== l)"
            >
                <Close class="w-3 h-3" />
            </button>
            <img :src="l.favicon" :alt="l.label">
        </a>

        <button
            class="flex gap-2 justify-center items-center bg-white shadow-md h-10 w-10 p-2 rounded-full"
            @click="showLinkDialog = true"
        >
            <PlusIcon class="w-4 h-4" />
        </button>

        <button
            v-if="links.length"
            class="flex gap-2 justify-center items-center bg-white shadow-md h-10 w-10 p-2 rounded-full"
            @click="editMode = true"
        >
            <Edit class="w-4 h-4" />
        </button>

        <ElDialog 
            v-model="showLinkDialog"
            title="Добавить ссылку"
        >
            <LinkForm
                ref="linkFormRef"
                :form-type="editMode ? 'edit' : 'create'"
                :model="currentLink"
                @success="addLinkHandler"
            />
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="showLinkDialog = false">Отмена</el-button>
                    <el-button type="primary" @click="linkFormRef?.save()">
                        Добавить
                    </el-button>
                </div>
            </template>
        </ElDialog>
    </div>
</template>