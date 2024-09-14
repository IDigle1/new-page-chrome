<template>
    <div>
        <ElForm
            ref="formRef"
            :model="form"
            label-position="top"
        >
            <ElFormItem
                label="Цвет фона"
                prop="appBackgroundColor"
            >
                <ElColorPicker
                    v-model="form.appBackgroundColor"
                />
            </ElFormItem>
            
            <ElFormItem
                label="URL изображения фона"
                prop="appBackgroundImage"
            >
                <ElInput
                    v-model="form.appBackgroundImage"
                />
            </ElFormItem>
            
            <!-- background-image -->
            <template v-if="form.appBackgroundImage">
                <ElFormItem
                    label="Повторять изображения фона"
                    prop="appBackgroundImageRepeat"
                >
                    <ElSelect
                        v-model="form.appBackgroundImageRepeat"
                    >
                        <ElOption
                            label="Да"
                            value="repeat" 
                        />
                        <ElOption
                            label="Нет" 
                            value="no-repeat" 
                        />
                    </ElSelect>
                </ElFormItem>

                <ElFormItem
                    label="Позиция изображения фона"
                    prop="appBackgroundImagePosition"
                >
                    <ElSelect
                        v-model="form.appBackgroundImagePosition"
                    >
                        <ElOption
                            label="Вверху"
                            value="top" 
                        />
                        <ElOption
                            label="Снизу" 
                            value="bottom" 
                        />
                        <ElOption
                            label="Слева"
                            value="left" 
                        />
                        <ElOption
                            label="Справа" 
                            value="right" 
                        />
                        <ElOption
                            label="По центру" 
                            value="center" 
                        />
                    </ElSelect>
                </ElFormItem>

                <ElFormItem
                    label="Размер изображения фона"
                    prop="appBackgroundImageSize"
                >
                    <ElSelect
                        v-model="form.appBackgroundImageSize"
                    >
                        <ElOption
                            label="Оригинал"
                            value="auto" 
                        />
                        <ElOption
                            label="Дотянуть" 
                            value="contain" 
                        />
                        <ElOption
                            label="Растянуть"
                            value="cover" 
                        />
                    </ElSelect>
                </ElFormItem>
            </template>
        </ElForm>
    </div>
</template>

<script lang="ts" setup>
import { useAppSettings, type IBackgroundSettings } from '@/entities/app-settings';
import {
    ElForm, 
    ElFormItem,
    ElSelect,
    ElInput, 
    ElOption,
    ElColorPicker, 
    type FormInstance
} from 'element-plus';
import { onMounted, reactive, ref, watch } from 'vue';

const formRef = ref<FormInstance>()

const appSetings = useAppSettings()

const form = reactive<IBackgroundSettings>({
    appBackgroundColor: '',
    appBackgroundImage: '',
    appBackgroundImageRepeat: 'repeat',
    appBackgroundImagePosition: 'top',
    appBackgroundImageSize: 'auto'
})

const save = () => {
    formRef.value?.validate((valid) => {
        if (valid) {
            appSetings.setBackgroundSettings(form)
        }
    })
}

watch(() => form, () => {
    save()
}, { deep: true })

onMounted(() => {
    const { appBackgroundColor, appBackgroundImage } = appSetings.backgroundSettings

    form.appBackgroundColor = appBackgroundColor
    form.appBackgroundImage = appBackgroundImage
})
</script>

<style lang="scss">
</style>