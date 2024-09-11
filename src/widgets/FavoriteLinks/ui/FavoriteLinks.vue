<script lang="ts" setup>
import { type FormRules, ElForm, ElFormItem, ElDialog, ElInput, ElButton } from 'element-plus'
import { PlusIcon } from '@/app/assets/icons'
import { ref, reactive, onMounted, watch } from 'vue';

interface ILink {
    label: string
    url: string
}

const links = ref<ILink[]>([
    {
        label: 'google',
        url: 'https://google.com/'
    },
    {
        label: 'yandex',
        url: 'https://yandex.ru/'
    },
])

const formRules: FormRules = {
    url: {
        required: true,
        trigger: 'change',
        message: 'Некорректный URL',
        validator: (rule, value) => {
            try {
                const url = new URL(value)
                return true
            } catch (error) {
                return false
            }
        }
    }
}

const form = reactive<ILink>({
    label: '',
    url: ''
})

const showLinkDialog = ref(false)

const addLinkHandler = () => {
    if (form.url[form.url.length - 1] !== '/') form.url += '/';

    links.value.push({ ...form, label: form.label || form.url })

    form.label = ''
    form.url = ''

    showLinkDialog.value = false
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
        
    }
})
</script>

<template>
    <div class="flex gap-2">
        <a
            v-for="l in links"
            class="flex justify-center items-center bg-white shadow-md h-10 w-10 p-2 rounded-full"
            :href="l.url"
            :title="l.label"
        >
            <img :src="`${l.url}/favicon.ico`" :alt="l.label">
        </a>

        <button
            class="flex justify-center items-center bg-white shadow-md h-10 w-10 p-2 rounded-full"
            @click="showLinkDialog = true"
        >
            <PlusIcon class="w-4 h-4" />
        </button>

        <ElDialog 
            v-model="showLinkDialog"
            title="Добавить ссылку"
        >
            <div>
                <ElForm
                    :model="form"
                    :rules="formRules"
                >
                    <ElFormItem
                        prop="label"
                    >
                        <ElInput
                            class="mb-2"
                            v-model="form.label"
                            placeholder="Имя"
                        />
                    </ElFormItem>

                    <ElFormItem
                        prop="url"
                    >
                        <ElInput
                            class=""
                            v-model="form.url"
                            placeholder="Ссылка"
                        />
                    </ElFormItem>
                </ElForm>
            </div>

            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="showLinkDialog = false">Отмена</el-button>
                    <el-button type="primary" @click="addLinkHandler">
                        Добавить
                    </el-button>
                </div>
            </template>
        </ElDialog>
    </div>
</template>