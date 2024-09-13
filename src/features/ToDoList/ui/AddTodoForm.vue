<script lang="ts" setup>
import { defineExpose } from 'vue'
import { dayjs } from '@/shared/lib/dayjs'
import { reactive, ref } from 'vue';
import type { IToDo } from '../model';
import { addTodoFormRules } from '../model';
import { 
    type FormInstance,
    ElForm,
    ElFormItem,
    ElInput,
    ElDatePicker
} from 'element-plus';

const emit = defineEmits(['success'])

const form = reactive<IToDo>({
    id: dayjs().unix(),
    title: '',
    description: '',
    isDone: false,
    createDate: '',
    endDate: '',
})

const formRef = ref<FormInstance>()


const submit = () => {
    formRef.value?.validate((valid) => {
        if (valid) {
            emit('success', { 
                ...form,
                createDate: dayjs().format('DD-MM-YYYY HH:mm')
            })
        }
    })
}

defineExpose({
    submit
})
</script>

<template>
    <div>
        <ElForm
            ref="formRef"
            :model="form"
            :rules="addTodoFormRules"
            label-position="top"
            hide-required-asterisk
        >
            <ElFormItem
                label="Заголовок"
                prop="title"
            >
                <ElInput 
                    v-model="form.title"
                />
            </ElFormItem>

            <ElFormItem
                label="Описание"
                prop="description"
            >
                <ElInput 
                    v-model="form.description"
                    type="textarea"
                    :rows="4"
                />
            </ElFormItem>

            <ElFormItem
                label="Дэдлайн"
                prop="endDate"
            >
                <ElDatePicker 
                    v-model="form.endDate"
                    format="DD-MM-YYYY"
                />
            </ElFormItem>
        </ElForm>
    </div>
</template>


<style lang="scss">
</style>