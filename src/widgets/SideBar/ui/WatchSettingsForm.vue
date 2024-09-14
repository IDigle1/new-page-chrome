<template>
    <div>
        <ElForm
            ref="formRef"
            :model="form"
            label-position="top"
        >
            <ElFormItem
                label="Цвет часов"
                prop="watchColor"
            >
                <ElColorPicker
                    v-model="form.watchColor"
                />
            </ElFormItem>
        </ElForm>
    </div>
</template>

<script lang="ts" setup>
import { useAppSettings, type IWatchSettings } from '@/entities/app-settings';
import {
    ElForm, 
    ElFormItem,
    ElColorPicker, 
    type FormInstance
} from 'element-plus';
import { onMounted, reactive, ref, watch } from 'vue';

const formRef = ref<FormInstance>()

const appSetings = useAppSettings()

const form = reactive<IWatchSettings>({
    watchColor: '',
})

const save = () => {
    formRef.value?.validate((valid) => {
        if (valid) {
            appSetings.setWatchSettings(form)
        }
    })
}

watch(() => form, () => {
    save()
}, { deep: true })

onMounted(() => {
    const { watchColor } = appSetings.watchSettings

    form.watchColor = watchColor
})
</script>

<style lang="scss">
</style>