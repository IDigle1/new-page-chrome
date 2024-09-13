import type { FormRules } from "element-plus";

export const addTodoFormRules: FormRules = {
    title: [
        {
            required: true,
            trigger: 'change',
            message: 'Обязательно для заполнения'
        },
        {
            min: 3,
            max: 50,
            trigger: 'change',
            message: `Не менее 3 и не более 50 символов`
        }
    ],
    description: [
        {
            required: true,
            trigger: 'change',
            message: 'Обязательно для заполнения'
        },
        {
            min: 3,
            max: 300,
            trigger: 'change',
            message: `Не менее 3 и не более 300 символов`
        }
    ]
}