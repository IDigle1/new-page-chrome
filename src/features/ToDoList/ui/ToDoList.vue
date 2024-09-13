<script lang="ts" setup>
import { ElButton, ElDialog } from 'element-plus';
import { Delete, Plus, Remove } from '@element-plus/icons-vue';
import { computed, ref } from 'vue';
import type { IToDo } from '../model';
import AddTodoForm from './AddTodoForm.vue';

const list = ref<IToDo[]>([])
const addTodoFormRef = ref<InstanceType<typeof AddTodoForm>>()
const currentTodoId = ref<null | number>(null)

const getCurrentToDo = computed(() => {
    return list.value.find(t => t.id === currentTodoId.value)
})

const showAddTaskModal = ref(false)

const createTaskHandler = (task: IToDo) => {
    list.value.push(task)
    showAddTaskModal.value = false
}
</script>

<template>
    <div class="overflow-hidden rounded-lg shadow-md bg-white w-96 h-80">
        <div class="h-full relative">
            <div class="flex justify-center text-gray-600 py-3 border-b border-gray-200">Список дел</div>
            <ElButton 
                class="absolute top-[9px] right-1"
                text
                @click="showAddTaskModal = true"
                @mousedown.stop
            >
                <Plus class="w-4 h-4" />
            </ElButton>
            <div class="flex flex-col gap-1 h-full p-1 bg-gray-50" v-if="!currentTodoId">
                <template v-if="list.length">
                    <div
                        v-for="l in list"
                        :key="l.id"
                        class="flex justify-between items-center bg-white rounded-lg py-2 px-4 text-gray-500 shadow"
                    >
                        <div>
                            {{ l.title }}
                        </div>
                        <div>
                            <ElButton
                                class="w-4"
                                size="small"
                                text
                            >
                                <Delete class="w-4 h-4 text-red-600" />
                            </ElButton>
                        </div>
                    </div>
                </template>
                <div 
                    v-if="!list.length"
                    class="h-full flex justify-center items-center text-gray-400"
                >
                    Список дел пуст
                </div>
            </div>
            <div class="h-full">
                <div class="h-6">
                    {{ getCurrentToDo?.title }}
                </div>
                <div>
                    {{ getCurrentToDo?.description }}
                </div>
            </div>
        </div>

        <ElDialog
            v-model="showAddTaskModal"
            destroy-on-close
        >
            <template #header>
                <div>Создание задачи</div>
            </template>

            <AddTodoForm
                ref="addTodoFormRef"
                @success="createTaskHandler"
            />

            <template #footer>
                <ElButton @click="showAddTaskModal = false">
                    Отмена
                </ElButton>

                <ElButton type="primary" @click="addTodoFormRef?.submit">
                    Создать
                </ElButton>
            </template>
        </ElDialog>
    </div>
</template>