<template>
    <ElForm
        ref="formRef"
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
</template>

<script lang="ts" setup>
import { ElForm, ElFormItem, ElInput } from 'element-plus'
import { onMounted, reactive, ref, type PropType } from 'vue';
import { formRules } from '../model'
import type { FormInstance } from 'element-plus';

const emit = defineEmits(['success'])

const props = defineProps({
    model: {
        type: [Object, null] as PropType<ILink | null>,
        default: null
    },
    formType: {
        type: String as PropType<'create' | 'edit'>,
        default: 'create'
    }
})

const form = reactive<ILink>({
    label: '',
    url: '',
    favicon: '',
})

const formRef = ref<FormInstance>()

const save = () => {
    formRef.value?.validate((valid) => {
        if (valid) {
            emit('success', {
                ...form,
                url: form.url,
                favicon: (new URL(form.url)).origin + '/favicon.ico'
            })
        }
    })
}

const setFormData = () => {
    const { label, url, favicon } = props.model!
    
    form.label = label
    form.url = url
    form.favicon = favicon
}

defineExpose({
    save
})

onMounted(() => {
    if (props.formType === 'edit') {
        setFormData()
    }
})
</script>

<style lang="scss">
</style>