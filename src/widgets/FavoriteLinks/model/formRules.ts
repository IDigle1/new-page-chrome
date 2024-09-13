import type { FormRules } from "element-plus"

export const formRules: FormRules = {
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