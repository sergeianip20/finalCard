import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useValidators, ValidatorsType } from 'features/auth/hooks/useValidators'
import { GradeType } from 'features/learn/hooks/useLearn'
import { useMemo } from 'react'

/**
 * Кастомный хук для работы с формой приложения.
 *
 * @param {ValidateFieldsType[]} [validateFields=[]] - Массив полей, подлежащих валидации.
 * @param {DefaultFieldsValues} [defaultInputValues={}] - Объект с значениями по умолчанию для полей формы.
 * @returns {Object} - Объект, содержащий функции и свойства для работы с формой.
 * @property {Function} handleSubmit - Функция обработки сабмита формы.
 * @property {Function} register - Функция регистрации полей формы.
 * @property {Object} errors - Объект, содержащий ошибки валидации для полей формы.
 * @property {Function} reset - Функция сброса значений полей формы.
 * @property {Object} control - Объект, содержащий методы для управления значениями формы.
 */

export const useAppForm = (validateFields: ValidateFieldsType[] = []) => {
    const { validators } = useValidators()

    const getValidateSchema = useMemo(
        () => (validators: ValidatorsType, validateFields: ValidateFieldsType[]) => {
            if (!validateFields.length) return {}
            const result: ValidatorsType = {}
            for (let i = 0; i < validateFields.length; i++) {
                result[validateFields[i]] = validators[validateFields[i]]
            }
            return result
        },
        []
    )

    const validateSchema = yup.object(getValidateSchema(validators, validateFields))

    const {
        handleSubmit,
        register,
        reset,
        formState: { errors },
        control,
    } = useForm<FormInputValues>({
        resolver: yupResolver(validateSchema),
        mode: 'onTouched',
    })

    return {
        handleSubmit,
        register,
        errors,
        reset,
        control,
    }
}

// TYPES
export type ValidateFieldsType =
    | 'email'
    | 'loginEmail'
    | 'password'
    | 'loginPassword'
    | 'confirmPassword'
    | 'textInput'

export type FormInputValues = {
    email: string
    loginEmail: string
    password: string
    loginPassword: string
    confirmPassword: string
    rememberMe: boolean
    textInput: string
    private: boolean
    question: string
    answer: string
    radio: GradeType
    packImg: FileList
    answerImg: FileList
    questionImg: FileList
}

export type DefaultFieldsValues = Partial<FormInputValues>
